// creating the container, heading, row and button

var divRow = createMyElement("div", "row d-flex", "row");
var divContainer = createMyElement("div", "container", "");
var h2 = createMyElement("h2", "text-center heading text-dark mt-2", "");
var btn = createMyElement("button", "btn btn-primary my-2");
var input = createMyElement("input", "form-control", "ifsc");
input.setAttribute("placeholder", "Enter your IFSC code");
var label = createMyElement("label", "form-label");

var colSm12 = createMyElement("div", "col-sm-12");
var cardMxauto = createMyElement("div", "card mx-auto");
var row = createMyElement("div", "row no-gutters");
var colMd4 = createMyElement("div", "col-md-6");
var img = createMyElement("img", "card-img");
img.src =
  "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80";
colMd4.append(img);
var colMd8 = createMyElement("div", "col-md-6");
var cardBody = createMyElement("div", "card-body");
var cardTitle = createMyElement("p", "card-title");
cardTitle.innerHTML = "Your Account Details";
var divDetails = createMyElement("div", "");
label.innerHTML = "IFSC code";
btn.innerHTML = "Get Details";
h2.innerHTML = "BANK ACCOUNT DETAILS";

cardBody.append(cardTitle, divDetails);
colMd8.append(cardBody);
row.append(colMd4, colMd8);
cardMxauto.append(label, input, btn, row);
colSm12.append(h2, cardMxauto);
divRow.append(colSm12);
divContainer.append(divRow);
document.body.append(divContainer);

//
//var ifscCode = "SBIN0008608";
// fetchimg account details

async function getAccDetails() {
  var ifscCode = document.getElementById("ifsc").value;
  try {
    const accDetails = await fetch(
      "https://ifsc.razorpay.com/" + ifscCode
    ).then((res) => res.json());

    divDetails.innerHTML = "";

    // creating the card by function call
    if (accDetails == "Not Found") {
      alert("IFSC code is not valid ");
    } else {
      card(accDetails);
    }
    //console.log(accDetails);
  } catch (e) {
    console.log(e);
  }
}
//getAccDetails();

// creating the card

function card(data) {
  para("IFSC : ", data.IFSC);
  para("BANK : ", data.BANK);
  para("BANKCODE : ", data.BANKCODE);
  para("BRANCH : ", data.BRANCH);
  para("CENTRE : ", data.CENTRE);
  para("CITY : ", data.CITY);
  para("DISTRICT : ", data.DISTRICT);
  para("ADDRESS : ", data.ADDRESS);
  para("STATE : ", data.STATE);
  para("CONTACT : ", data.CONTACT);
  para("IMPS : ", data.IMPS);
  para("MICR : ", data.MICR);
  para("NEFT : ", data.NEFT);
  para("RTGS : ", data.RTGS);
  para("SWIFT : ", data.SWIFT);
  para("UPI : ", data.UPI);
}

// creating the paragraph element for each values

function para(title, text) {
  var p = createMyElement("p", "card-text");
  p.innerHTML = title;
  if (text == true) {
    var small = createMyElement("small", "text-success h6");
  } else if (text == "") {
    var small = createMyElement("small", "text-danger");
  } else {
    var small = createMyElement("small", "text-muted");
  }

  if (text == "") {
    small.innerHTML = "NIL";
  } else if (text == true) {
    small.innerHTML = "YES";
  } else if (text == false) {
    small.innerHTML = "NO";
  } else if (text == undefined) {
    small.innerHTML = "-";
  } else {
    small.innerHTML = text;
  }
  p.append(small);
  divDetails.append(p);
}

// function for creacting the html element

function createMyElement(eleName, eleClass = "", eleId = "") {
  let ele = document.createElement(eleName);
  ele.setAttribute("class", eleClass);
  ele.id = eleId;
  return ele;
}

// on button click calling the acc details function

btn.addEventListener("click", getAccDetails);
