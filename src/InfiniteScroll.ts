import Visible from "@egjs/visible";

interface Props {
  scrollContainer?: HTMLElement;
  listContainer: HTMLElement;
  endChecker: {
    container: HTMLElement | Document | Window;
    targetClass: string;
  };
  fetchData?: FetchData;
  callbackFetchData?: CallbackFetchData;
  options: {
    type: "append" | "render";
    expandSize?: number;
    withBlinkAnimation?: boolean;
  };
}

type FetchData = () => Promise<{
  data: JQuery.htmlString;
  fetchData?: FetchData;
}>;

type CallbackFetchData = () => { callbackFetchData?: CallbackFetchData };

class InfiniteScroll {
  /**
   * @param endChecker : can be loading spinner
   */
  private props: Props;
  private fetchData?: FetchData;
  private callbackFetchData?: CallbackFetchData;
  private $visible?: Visible | null;
  private $loadingBar?: HTMLElement | null;

  constructor(props: Props) {
    this.props = props;
    this.fetchData = this.props.fetchData;
    this.callbackFetchData = this.props.callbackFetchData;
    this.$loadingBar = (
      this.props.endChecker.container as Element
    ).querySelector<HTMLElement>(`.${this.props.endChecker.targetClass}`);
  }

  public mount = (): void => {
    this.$visible = new Visible(this.props.endChecker.container, {
      targetClass: this.props.endChecker.targetClass,
      expandSize: this.props.options.expandSize,
    });

    this.$visible.on("change", this.handleChange);
    this.$visible.observe();
  };

  private handleChange = (event: {
    visible: Array<Record<string, any>>;
    invisible: Array<Record<string, any>>;
  }) => {
    if (this.fetchData && event.visible.length) {
      this.fetchData()
        .then((response) => {
          if (this.props.options.type === "append") {
            this.props.listContainer.innerHTML += response.data;
          } else if (this.props.options.type === "render") {
            this.props.scrollContainer
              ? this.props.scrollContainer.scrollTo(
                  this.props.scrollContainer.scrollLeft,
                  0
                )
              : window.scrollTo(window.scrollX, 0);
            this.props.listContainer.innerHTML = response.data;
          } else {
            throw new Error("there is no infinite scroll type");
          }

          if (response.fetchData) {
            if (this.props.options.withBlinkAnimation) {
              this.$loadingBar && (this.$loadingBar.style.display = "none");
              setTimeout(() => {
                this.$loadingBar && (this.$loadingBar.style.display = "block");
              }, 20);
            }
          } else {
            this.$loadingBar && (this.$loadingBar.style.display = "none");
          }

          this.fetchData = response.fetchData;

          if (this.callbackFetchData) {
            this.callbackFetchData = this.callbackFetchData().callbackFetchData;
          }
        })
        .catch((error) => {
          console.error(error);
          this.$loadingBar && (this.$loadingBar.style.display = "none");
        });
    }
  };

  public unmount = (): void => {
    this.$visible?.unobserve();
    this.$visible?.off("change");
    this.$visible = null;
  };
}

export default InfiniteScroll;
