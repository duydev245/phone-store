const getEle = (id) => document.getElementById(id);

export class Validate {
  numRegex = /^[0-9]+$/;

  messageSwitch = (isFalse, idTB, message = '') => {
    if (isFalse == false) {
      getEle(idTB).style.display = 'block';
      getEle(idTB).innerHTML = message;
      return false;
    } else if (isFalse == true) {
      getEle(idTB).innerHTML = '&#8205'; //invisible (to keep distance between forms unchanged)
      return true;
    }
  };

  isNotEmpty(id, idTB) {
    let text = getEle(id).value.trim();
    return text == ''
      ? this.messageSwitch(false, idTB, `(*)This field can't be empty`)
      : this.messageSwitch(true, idTB);
  }

  isSelected(id, idTB) {
    let theSelect = getEle(id);
    return theSelect.selectedIndex == 0
      ? this.messageSwitch(false, idTB, '(*)Please select one option')
      : this.messageSwitch(true, idTB);
  }

  isMatch(id, idTB, format, message) {
    let text = getEle(id).value;
    return !format.test(text)
      ? this.messageSwitch(false, idTB, message)
      : this.messageSwitch(true, idTB);
  }

  isNotExist(phoneList, isUpdate = false) {
    if (isUpdate) return this.messageSwitch(true, 'tbname');
    for (let i = 0; i < phoneList.length; i++) {
      if (getEle('name').value == phoneList[i].name) {
        return this.messageSwitch(false, 'tbname', '(*)This phone already exist');
      }
    }
    return this.messageSwitch(true, 'tbname');
  }

  isValid(phoneList, isUpdate) {
    let valid = true;
    valid &= this.isNotEmpty('name', 'tbname') && this.isNotExist(phoneList, isUpdate);
    valid &=
      this.isNotEmpty('price', 'tbprice') &&
      this.isMatch('price', 'tbprice', this.numRegex, '(*)Price must be a number');

    valid &= this.isNotEmpty('screen', 'tbscreen');
    valid &= this.isNotEmpty('backCam', 'tbbackCam');
    valid &= this.isNotEmpty('frontCam', 'tbfrontCam');
    valid &= this.isNotEmpty('img', 'tbimg');
    valid &= this.isNotEmpty('desc', 'tbdesc');
    valid &= this.isSelected('type', 'tbtype');
    return valid;
  }
}