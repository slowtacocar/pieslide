/** @jsx this.createElement */

import jsx from "../lib/jsx.js";

class Logo extends jsx.Component {
  render() {
    return (
      <div ref="logo" class="fixed-top-left"></div>
    );
  }

  changeUser(docRef, folderRef, settingsRef) {
    docRef.onSnapshot(this.changeData);
    this.folderRef = folderRef;
    settingsRef.onSnapshot(this.changeSettings);
  }

  changeData(doc) {
    this.setImage(doc.get("name"), this.folderRef);
  }

  changeSettings(doc) {
    const size = doc.get("size");

    this.refs.logo.style.width = `${size}vw`;
    this.refs.logo.style.height = `${size}vh`;
  }

  async setImage(name, ref) {
    if (name) {
      const url = await ref.child(name).getDownloadURL();

      this.refs.logo.style.background =
        `url(${url}) top left/contain no-repeat`;
    } else {
      this.refs.logo.style.background = "none";
    }
  }
}

export default Logo;
