import Visible from "@egjs/visible";
import $ from "jquery";

interface Props {
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

  constructor(props: Props) {
    this.props = props;
    this.fetchData = this.props.fetchData;
    this.callbackFetchData = this.props.callbackFetchData;
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
          this.props.options.type === "append"
            ? $(this.props.listContainer).append(response.data)
            : $(this.props.listContainer).html(response.data);

          if (response.fetchData) {
            if (this.props.options.withBlinkAnimation) {
              $(this.props.endChecker.container)
                .find(`.${this.props.endChecker.targetClass}`)
                .hide();
              setTimeout(() => {
                $(this.props.endChecker.container)
                  .find(`.${this.props.endChecker.targetClass}`)
                  .show();
              }, 20);
            }
          } else {
            $(this.props.endChecker.container)
              .find(`.${this.props.endChecker.targetClass}`)
              .hide();
          }

          this.fetchData = response.fetchData;

          if (this.callbackFetchData) {
            this.callbackFetchData = this.callbackFetchData().callbackFetchData;
          }
        })
        .catch((error) => {
          console.error(error);
          $(this.props.endChecker.container)
            .find(`.${this.props.endChecker.targetClass}`)
            .hide();
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
