import * as React from "react"
import * as ReactDOM from "react-dom"

import classnames from "classnames"

import styles from "./index.css"

ReactDOM.render(
  <div className={classnames(styles.largeFont, styles.textColorBlue, styles.textBlue800)}>
    Hello World
  </div>,
  document.getElementById("root")
)
