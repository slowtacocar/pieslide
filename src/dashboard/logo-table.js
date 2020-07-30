import Table from "./table.js";

class LogoTable extends Table {
  constructor() {
    super({
      "defaultData": { "name": null },
      "inputGroup": "inputGroupLogo",
      "inputGroupAddon": "inputGroupLogoAddon",
      "inputGroupLabel": "inputGroupLogoLabel",
      "modal": "logoProgressModal",
      "progressBar": "logoProgressBar"
    });
    this.deleteItem = this.deleteItem.bind(this);
    this.tableBody = document.getElementById("tbodyLogo");
  }

  changeUser(docRef, folderRef) {
    super.changeUser(docRef, folderRef);
  }

  async updateTable(data) {
    this.name = data.name;

    if (this.name) {
      const ref = this.folderRef.child(this.name);
      const url = await ref.getDownloadURL();
      const head = document.createElement("th");
      const previewButton = document.createElement("button");
      const preview = document.createElement("td");
      const delButton = document.createElement("button");
      const del = document.createElement("td");
      const row = document.createElement("tr");

      head.setAttribute("scope", "row");
      head.textContent = this.name;
      previewButton.className = "btn btn-primary";
      previewButton.dataset.link = url;
      previewButton.dataset.target = "#previewModalImage";
      previewButton.dataset.toggle = "modal";
      previewButton.type = "button";
      previewButton.textContent = "View Preview";
      preview.append(previewButton);
      delButton.className = "btn btn-danger delete";
      delButton.type = "button";
      delButton.textContent = "Delete";
      delButton.addEventListener("click", this.deleteItem);
      del.append(delButton);
      row.append(head);
      row.append(preview);
      row.append(del);

      if (this.tableBody.firstChild) {
        this.tableBody.removeChild(this.tableBody.firstChild);
      }

      this.tableBody.append(row);
    } else {
      this.tableBody.removeChild(this.tableBody.firstChild);
    }
  }

  async deleteItem() {
    await this.folderRef.child(this.name).delete();
    this.docRef.update({ "name": null });
  }

  static docData(name) {
    return { name };
  }
}

export default LogoTable;
