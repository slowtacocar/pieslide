class SettingsForm {
  constructor() {
    this.inputGroupDuration = document.getElementById("inputGroupDuration");
    this.inputGroupNews = document.getElementById("inputGroupNews");
    this.inputGroupSize = document.getElementById("inputGroupSize");
    this.inputGroupTime = document.getElementById("inputGroupTime");
    this.inputGroupTransition = document.getElementById("inputGroupTransition");
    this.buttonSaveSettings = document.getElementById("buttonSaveSettings");
    this.buttonSaveSettings.addEventListener("click", this.save);
    this.buttonRefresh = document.getElementById("buttonRefresh");
    this.buttonRefresh.addEventListener("click", this.reload);
  }

  save = () => {
    this.docRef.update({
      "duration": this.inputGroupDuration.value,
      "news": this.inputGroupNews.value.split(","),
      "size": this.inputGroupSize.value,
      "time": this.inputGroupTime.value === "show",
      "transition": this.inputGroupTransition.value
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
        this.inputGroupTime.value = "show";
      } else {
        this.inputGroupTime.value = "hide";
      }

      this.inputGroupDuration.value = data.duration;
      this.inputGroupTransition.value = data.transition;
      this.inputGroupSize.value = data.size;
      this.inputGroupNews.value = data.news.join(",");
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
