import Table from "./table.js";

class LogoTable extends Table {
  constructor() {
    super({
      "defaultData": { "name": null },
      "inputGroup": "#inputGroupLogo",
      "inputGroupAddon": "#inputGroupLogoAddon",
      "inputGroupLabel": "#inputGroupLogoLabel",
      "modal": "#logoProgressModal",
      "progressBar": "#logoProgressBar"
    });
  }

  tableBody = document.getElementById("tbodyLogo");

  changeUser = (docRef, folderRef) => {
    super.changeUser(docRef, folderRef);
  };

  updateTable = (data) => {
    this.name = data.name;

    if (this.name) {
      const ref = this.folderRef.child(this.name);

      ref.getDownloadURL().then(this.addTableData);
    } else {
      this.tableBody.removeChild(this.tableBody.firstChild);
    }
  };

  addTableData = (url) => {
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
    preview.appendChild(previewButton);
    delButton.className = "btn btn-danger delete";
    delButton.type = "button";
    delButton.textContent = "Delete";
    delButton.addEventListener("click", this.deleteItem);
    del.appendChild(delButton);
    row.appendChild(head);
    row.appendChild(preview);
    row.appendChild(del);

    if (this.tableBody.firstChild) {
      this.tableBody.removeChild(this.tableBody.firstChild);
    }

    this.tableBody.appendChild(row);
  };

  deleteItem = () => {
    this.folderRef.child(this.name).delete()
      .then(this.deleteEntry);
  };

  deleteEntry = () => {
    this.docRef.update({ "name": null });
  };

  docData = (name) => ({ name });
}

export default LogoTable;
