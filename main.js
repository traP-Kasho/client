"use strict";

let searchBox = document.getElementById("searchBox");
searchBox.init = function () {
	this.addEventListener("keyup", () => table.select(this.value));
};

let table = document.getElementById("table");
table.init = function () {
	this.deleteRow(1);
	data.forEach((element, index, array) => {
		let newRow = this.insertRow(-1);
		let newCell;
		newCell = newRow.insertCell(-1);
		newCell.appendChild(document.createTextNode(element.displayName));
		let reputation = element.scores.positive / (element.scores.positive + element.scores.negative);
		newCell = newRow.insertCell(-1);
		newCell.appendChild(document.createTextNode(reputation.toString()));
		let reputationString;
		if (reputation < 0.1) reputationString = "圧倒的に不評";
		else if (reputation < 0.35) reputationString = "ほぼ不評";
		else if (reputation < 0.65) reputationString = "賛否両論";
		else if (reputation < 0.9) reputationString = "ほぼ好評";
		else reputaitonString = "圧倒的に好評";
		newCell = newRow.insertCell(-1);
		newCell.appendChild(document.createTextNode(reputationString));
		newCell = newRow.insertCell(-1);
		newCell.appendChild(document.createTextNode("詳しく見る"));
	});
	searchBox.init();
};
table.select = function (keyword) {
	if (!keyword) {
		data.forEach((element, index, array) => {
			this.rows[index + 1].style.display = "table-row";
		});
	} else {
		data.forEach((element, index, array) => {
			let showRow = false;
			element.names.forEach((element2, index2, array2) => {
				if (showRow) return;
				if (!element2.indexOf(keyword.toLowerCase())) showRow = true;
			});
			this.rows[index + 1].style.display = showRow ? "table-row" : "none";
		});
	}
};

let data = [];
data.init = function (url) {
	let request = new XMLHttpRequest();
	let self = this;
	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			self.push.apply(self, JSON.parse(this.responseText));
			table.init();
		}
	};
	request.open("GET", url, true);
	request.send();
};

data.init("data.json");