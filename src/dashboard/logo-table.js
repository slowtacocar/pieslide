/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import Table from "./table.js";
import jsx from "../lib/jsx.js";
import styles from "./logo-table.module.css";

class LogoTable extends Table {
  constructor(props) {
    super({
      ...props,
      "defaultData": { "name": null },
      "name": "logo"
    });
  }

  render() {
    return (
      <section id="logo" class="section">
        <header>
          <h1 class="header">Logo</h1>
          <p class="headerSub">
            Use the input to change the logo that appears in the corner
            of your slideshow.
          </p>
        </header>
        {super.render()}
      </section>
    );
  }

  async updateTable(data) {
    if (data.name) {
      const url = await this.folderRef.child(data.name).getDownloadURL();
      const element =
        <tr>
          <th scope="row">{data.name}</th>
          <td>
            <button
              type="button"
              data-link={url}
              onclick={this.refs.preview.showImage}
              class={styles.preview}
            >View Preview</button>
          </td>
          <td>
            <button
              type="button"
              onclick={this.deleteItem}
              data-name={data.name}
              class={styles.delete}
            >Delete</button>
          </td>
        </tr>;

      jsx.render(this.refs.tableBody, element);
    } else {
      jsx.render(this.refs.tableBody);
    }
  }

  async deleteItem(event) {
    await this.folderRef.child(event.target.getAttribute("data-name")).delete();
    this.docRef.update({ "name": null });
  }

  toObject(name) {
    return { name };
  }
}

export default LogoTable;
