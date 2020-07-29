import Table from "./table.js";
import jQuery from "jquery";

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

  tableBody = jQuery("#tbodyLogo");

  changeUser = (docRef, folderRef) => {
    super.changeUser(docRef, folderRef);
  };

  updateTable = (data) => {
    this.name = data.name;

    if (this.name) {
      const ref = this.folderRef.child(this.name);

      ref.getDownloadURL().then(this.addTableData);
    } else {
      this.tableBody.empty();
    }
  };

  addTableData = (url) => {
    this.tableBody.html(jQuery("<tr></tr>").append(jQuery("<th></th>", {
      "html": this.name,
      "scope": "row"
    }))
      .append(jQuery("<td></td>").append(jQuery("<button></button>", {
        "class": "btn btn-primary",
        "data-link": url,
        "data-target": "#previewModalImage",
        "data-toggle": "modal",
        "html": "View Preview",
        "type": "button"
      })))
      .append(jQuery("<td></td>").append(jQuery("<button></button>", {
        "class": "btn btn-danger delete",
        "html": "Delete",
        "id": "buttonDeleteLogo",
        "type": "button"
      }))));
    jQuery("#buttonDeleteLogo").click(this.deleteItem);
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
