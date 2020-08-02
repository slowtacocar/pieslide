/** @jsx this.createElement */

import Table from "./table.js";
import jsx from "../lib/jsx.js";

class LogoTable extends Table {
  constructor(props) {
    super({ ...props, "defaultData": { "name": null }, "name": "logo" });
  }

  render() {
    return (
      <div>
        <div id="logo" class="spacer"></div>
        <h1>Logo</h1>
        <p class="lead">
          Use the input to change the logo that appears in the corner
          of your slideshow.
        </p>
        <table class="table">
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
        {super.render()}
      </div>
    );
  }

  async updateTable(data) {
    if (data.name) {
      const url = await this.folderRef.child(data.name).getDownloadURL();
      const element =
        <tr>
          <th scope="row">{this.name}</th>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              data-link={url}
              data-target="#modalPreviewImage"
              data-toggle="modal"
            >View Preview</button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-danger delete"
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
