/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import jsx from "../lib/jsx.js";
import styles from "./logo.module.css";

class Logo extends jsx.Component {
  render() {
    return (
      <img ref="logo" class={styles.logo} crossorigin="anonymous"></img>
    );
  }

  changeUser(docRef, folderRef, settingsRef) {
    docRef.onSnapshot(this.changeData);
    this.folderRef = folderRef;
    settingsRef.onSnapshot(this.changeSettings);
  }

  async changeData(doc) {
    const name = doc.get("name");

    this.refs.logo.hidden = !name;

    if (name) {
      this.refs.logo.src = await this.folderRef.child(name).getDownloadURL();
    }
  }

  changeSettings(doc) {
    const size = doc.get("size");

    this.refs.logo.style.width = `${size}vw`;
    this.refs.logo.style.height = `${size}vh`;
  }
}

export default Logo;
