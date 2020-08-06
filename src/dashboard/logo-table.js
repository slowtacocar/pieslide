/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import Table from "./table.js";
import jsx from "../lib/jsx.js";

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
      <section id="logo">
        <header>
          <h1>Logo</h1>
          <p>
            Use the input to change the logo that appears in the corner
            of your slideshow.
          </p>
        </header>
        <div class="table-scroller">
          <table>
            <thead>
              <tr>
                <th scope="col">Current Logo</th>
                <th scope="col">Preview</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody ref="tableBody">
            </tbody>
          </table>
        </div>
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
            >View Preview</button>
          </td>
          <td>
            <button
              type="button"
              class="delete"
              onclick={this.deleteItem}
              data-name={data.name}
            >Delete</button>
          </td>
        </tr>;

      jsx.render(this.refs.tableBody, element);
    } else {
      jsx.render(this.refs.tableBody);
    }
  }

  async deleteItem(event) {
    await this.folderRef.child(event.target.dataset.name).delete();
    this.docRef.update({ "name": null });
  }

  toObject(name) {
    return { name };
  }
}

export default LogoTable;
