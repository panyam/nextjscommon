import React from "react";
import styles from "./View.module.scss";
import Image from "next/image";
import LoadingImage from "../../public/loading.gif";

export class Loader extends React.Component<any> {
  state: any;
  loaderDivRef = React.createRef<HTMLDivElement>();
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      show: props.show || true,
    };
  }

  show(value = true) {
    this.setState((ps) => ({
      ...ps,
      show: value,
    }));
  }

  render() {
    return (
      <>
        {this.props.children}
        {this.state.show ?
          <div ref={this.loaderDivRef} className={styles.loaderDiv}>
            <Image width={100} height={100} src={LoadingImage} alt="Loading..."
            style={{"left": "50%", "top": "50%", "position": "absolute",
                    "transform": "translate(-50%,-50%)",
                    /* "-webkit-transform": "translate(-50%,-50%)"*/ }} />
          </div>
          : null
        }
      </>
    );
  }
}
