const domUpdates = {

  renderFirstName(user) {
    const name = document.getElementById('name');
    name.innerText = `${traveler.getName()}`;
  },

  // makeSleepHTML(method) {
  //   return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
  // },

  // sleepHeader: document.getElementById('sleepFormHeader')
}

export default domUpdates;
