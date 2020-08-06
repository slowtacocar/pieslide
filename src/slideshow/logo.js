/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import jsx from "../lib/jsx.js";

class Logo extends jsx.Component {
  render() {
    return (
      <img ref="logo" id="logo" crossorigin="anonymous"></img>
    );
  }

  changeUser(docRef, folderRef, settingsRef) {
    docRef.onSnapshot(this.changeData);
    this.folderRef = folderRef;
    settingsRef.onSnapshot(this.changeSettings);
  }

  async changeData(doc) {
    const name = doc.get("name");

    if (name) {
      this.refs.logo.hidden = false;
      this.refs.logo.src = await this.folderRef.child(name).getDownloadURL();
    } else {
      this.refs.logo.hidden = true;
    }
  }

  changeSettings(doc) {
    const size = doc.get("size");

    this.refs.logo.style.width = `${size}vw`;
    this.refs.logo.style.height = `${size}vh`;
  }
}

export default Logo;
