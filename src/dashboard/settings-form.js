import jQuery from "jquery";

class SettingsForm {
  constructor() {
    this.inputGroupDuration = jQuery("#inputGroupDuration");
    this.inputGroupNews = jQuery("#inputGroupNews");
    this.inputGroupSize = jQuery("#inputGroupSize");
    this.inputGroupTime = jQuery("#inputGroupTime");
    this.inputGroupTransition = jQuery("#inputGroupTransition");
    jQuery("#buttonSaveSettings").click(this.save);
    jQuery("#buttonRefresh").click(this.reload);
  }

  save = () => {
    this.docRef.update({
      "duration": this.inputGroupDuration.val(),
      "news": this.inputGroupNews.val().split(","),
      "size": this.inputGroupSize.val(),
      "time": this.inputGroupTime.val() === "show",
      "transition": this.inputGroupTransition.val()
    });
  };

  reload = () => {
    this.docRef.update({ "message": "reload" });
  };

  changeUser = (docRef) => {
    this.docRef = docRef;
    this.docRef.onSnapshot(this.changeData);
  };

  changeData = (doc) => {
    if (doc.exists) {
      const data = doc.data();

      if (data.time) {
        this.inputGroupTime.val("show");
      } else {
        this.inputGroupTime.val("hide");
      }

      this.inputGroupDuration.val(data.duration);
      this.inputGroupTransition.val(data.transition);
      this.inputGroupSize.val(data.size);
      this.inputGroupNews.val(data.news.join(","));
    } else {
      this.docRef.set({
        "duration": 5,
        "message": "",
        "news": [ "https://news.google.com/news/rss" ],
        "size": 30,
        "time": true,
        "transition": 0.25
      });
    }
  };
}

export default SettingsForm;
