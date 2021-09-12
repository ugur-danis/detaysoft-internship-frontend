class PersonManager {
  constructor() {
    this.idCounter = 0;
    this.personList = [];
  }

  getId() {
    return this.idCounter++;
  }

  dataValidate(data) {
    const isOwnPropery = this.hasOwnProperty(data);
    const isNull = this.hasNullValue(data);
    return isOwnPropery && isNull ? true : false;
  }

  hasOwnProperty(object) {
    let keyList = ["name", "lastName", "phoneNumber"];
    let isSucces = true;
    let i = 0;

    for (let key in object) {
      if (key != keyList[i]) {
        isSucces = false;
        break;
      }
      i++;
    }
    return isSucces;
  }

  hasNullValue(object) {
    var isSucces = true;
    for (let key in object)
      if (object[key] == null || object[key] == "") {
        isSucces = false;
        break;
      }
    return isSucces;
  }

  listPersons() {
    return this.personList;
  }

  savePerson(person) {
    let isValid = this.dataValidate(person);
    if (!isValid) return;
    person.id = this.getId();
    this.personList.push(person);
  }

  editPerson(person) {
    let foundPersonIndex = this.personList.findIndex((x) => {
      return x.id == person.id;
    });
    if (foundPersonIndex == -1) return;
    this.personList[foundPersonIndex] = person;
  }

  deletePerson(personId) {
    let foundPersonIndex = this.personList.findIndex((x) => {
      return x.id == personId;
    });
    if (foundPersonIndex == -1) return;
    this.personList = this.personList.filter((value, index) => {
      return index != foundPersonIndex;
    });
  }
}

const personManager = new PersonManager();
const saveBtn = document.getElementById("btn-save");
const personListElement = document.querySelector("#person-list");
const newPersonNameInput = document.querySelector("#name");
const newPersonLastNameInput = document.querySelector("#last-name");
const newPersonPhoneNumberInput = document.querySelector("#phone-number");

saveBtn.addEventListener("click", () => {
  const person = {
    name: newPersonNameInput.value,
    lastName: newPersonLastNameInput.value,
    phoneNumber: newPersonPhoneNumberInput.value,
  };
  savePerson(person);
});

function savePerson(person) {
  personManager.savePerson(person);
  updatePersonList();
}

function editPerson(person) {
  personManager.editPerson(person);
  updatePersonList();
}

function deletePerson(personId) {
  personManager.deletePerson(personId);
  updatePersonList();
}

function clearPersonInput() {
  newPersonNameInput.value = "";
  newPersonLastNameInput.value = "";
  newPersonPhoneNumberInput.value = "";
}

function editBtn(
  button,
  personId,
  nameElementId,
  lastNameElementId,
  phoneNumberElementId
) {
  if (button.innerHTML == "Düzenle") {
    button.innerHTML = "Kaydet";

    displayPersonUpdateInput(
      nameElementId,
      lastNameElementId,
      phoneNumberElementId
    );
  } else {
    button.innerHTML = "Düzenle";

    const nameElement = document.getElementById(nameElementId);
    const lastNameElement = document.getElementById(lastNameElementId);
    const phoneNumberElement = document.getElementById(phoneNumberElementId);

    const nameValue = nameElement.firstChild.value;
    const lastNameValue = lastNameElement.firstChild.value;
    const phoneNumberValue = phoneNumberElement.firstChild.value;

    const person = {
      id: personId,
      name: nameValue,
      lastName: lastNameValue,
      phoneNumber: phoneNumberValue,
    };
    editPerson(person);
  }
}

function displayPersonUpdateInput(
  nameElementId,
  lastNameElementId,
  phoneNumberElementId
) {
  const nameElement = document.getElementById(nameElementId);
  const lastNameElement = document.getElementById(lastNameElementId);
  const phoneNumberElement = document.getElementById(phoneNumberElementId);

  const nameInputElement = document.createElement("input");
  nameInputElement.type = "text";
  nameInputElement.value = nameElement.textContent;

  const lastNameInputElement = document.createElement("input");
  lastNameInputElement.type = "text";
  lastNameInputElement.value = lastNameElement.textContent;

  const phoneNumberInputElement = document.createElement("input");
  phoneNumberInputElement.type = "tel";
  phoneNumberInputElement.value = phoneNumberElement.textContent;

  nameElement.innerHTML = "";
  nameElement.append(nameInputElement);

  lastNameElement.innerHTML = "";
  lastNameElement.append(lastNameInputElement);

  phoneNumberElement.innerHTML = "";
  phoneNumberElement.append(phoneNumberInputElement);
}

function updatePersonList() {
  const personListData = personManager.listPersons();
  personListElement.innerHTML = "";

  personListData.forEach((person) => {
    let personListItem = `
    <tr>
    <td id="p-${person.id}-name">${person.name}</td>
    <td id="p-${person.id}-lastName">${person.lastName}</td>
    <td id="p-${person.id}-phoneNumber">${person.phoneNumber}</td>
    <td>
        <button class="btn-edit" onclick="editBtn(this,'${person.id}','p-${person.id}-name','p-${person.id}-lastName','p-${person.id}-phoneNumber')">Düzenle</button>
        <button class="btn-del" onclick="deletePerson('${person.id}')">Sil</button>
    </td>
    </tr>`;
    personListElement.insertAdjacentHTML("beforeend", personListItem);
  });
  clearPersonInput();
}
