let table = document.getElementById('bagua-table');
let td = table.querySelectorAll('table tr td')[1];

let textTd = document.createElement('td');
textTd.style.padding = 0;

let textarea = document.createElement('textarea');
textarea.style.width = (td.clientWidth - 2) + 'px';
textarea.style.height = (td.clientHeight - 2) + 'px';
textTd.append(textarea);

let buttons = document.createElement('div');
buttons.className = 'buttons';
let ok = document.createElement('button');
ok.textContent = 'OK';
let cancel = document.createElement('button');
cancel.textContent = 'Cancel';
buttons.append(ok);
buttons.append(cancel);

function addButtons(parentTd) {
  buttons.style.top = parentTd.offsetTop + parentTd.clientHeight + 'px';
  buttons.style.left = parentTd.offsetLeft + 'px';
  table.append(buttons);
}


//textarea.style.height = getComputedStyle(row).height;
// subtrace 2 for the 1px border
// textarea.style.height = (parseInt(getComputedStyle(row).height) - 2) + 'px';

let editInProgress = false;

table.addEventListener('click', (event) => {
  if (editInProgress) {
    return;
  }
  
  let currentTd = event.target.closest('td');
  if (currentTd == null) {
    return ;
  }

  textarea.value = currentTd.innerHTML;
  currentTd.replaceWith(textTd);
  addButtons(textTd);
  editInProgress = true;
  textarea.focus();
  
  ok.onclick = (evt) => {
    currentTd.innerHTML = textarea.value;
    textTd.replaceWith(currentTd);
    buttons.remove();
    editInProgress = false;
  }

  cancel.onclick = (evt) => {
    textTd.replaceWith(currentTd);
    buttons.remove();
    editInProgress = false;
  };


});
