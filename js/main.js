"use strict";

import Contact from "./modules/Contact.js";

// ----------------------------------------------------
// CHAMPS

let DOMtable,
    DOMform,
    DOMmodifier = [],
    DOMsupprimer = [],
    DOMlegend,
    DOMsubmit,
    DOMreset;

let currentId;
let isModify = false;
let modifyId;

const Data = 
[
    new Contact(0, "M.", "Dupont","Jean", "1973-10-08", "+(33)6 12 36 54 78", "jdupont@exemple.com"),
    new Contact(1, "Mme", "Doe", "Jeanne", "1985-02-24", "+(33)6 45 23 87 14", "jdoe@example.net"),
    new Contact(2, "Mlle", "Martin","Jacqueline","1933-06-22", "", "")
];

// ----------------------------------------------------
// FONCTIONS

function CreateTable()
{
    let allTR = DOMtable.querySelectorAll("tr");
    for (let i = 0; i < allTR.length; i++) {
        allTR[i].remove();
    }
    
    let chaine = "";

    for (let i = 0; i < Data.length; i++) {
        chaine += CreateTableTR(Data[i]);
        if(i == Data.length-1)
        {
            currentId = Data[i].id;
        }
    }
    
    DOMtable.innerHTML += chaine;
}

function CreateTableTR(item)
{
    let date = "";
    if(item.naissance != "")
    {
        date = new Date(item.naissance).toLocaleDateString("fr-FR");
    }

    let chaine = `<tr data-id="${item.id}">
        <td>${item.titre}</td>
        <td>${item.nom}</td>
        <td>${item.prenom}</td>
        <td>${date}</td>
        <td>${item.telephone}</td>
        <td>${item.courriel}</td>
        <td><button class="modifier">M</button> <button class="supprimer">X</button></td>
    </tr>`;

    // DOMtable.innerHTML += chaine;  
    return chaine;  
}

function ResetFormContent()
{
    DOMform.reset();
    ResetFormModify();
}

function SubmitForm(e)
{
    e.preventDefault();
    let target = e.target;

    // console.log(target.elements);

    let titre = target.querySelector('input[name="genre"]:checked').value;
    let nom = target.elements.Nom.value;
    let prenom = target.elements.Prenom.value;
    let dateNaissance = target.elements.Date.value;
    let telephone = target.elements.Telephone.value;
    let courriel = target.elements.Courriel.value;

    let nonRenseigne = ""
    if(nom == "") nom = nonRenseigne;
    if(prenom == "") prenom = nonRenseigne;
    if(dateNaissance == "") 
    {
        dateNaissance = nonRenseigne;
    }
    if(telephone == "") telephone = nonRenseigne;
    if(courriel == "") courriel = nonRenseigne;

    if(isModify)
    {
        let contact = Data.find(el => el.id == modifyId);
        contact.titre = titre;
        contact.nom = nom;
        contact.prenom = prenom;
        contact.naissance = dateNaissance;
        contact.telephone = telephone;
        contact.courriel = courriel;
    }
    else
    {
        let newContact = new Contact(++currentId, titre, nom, prenom, dateNaissance, telephone, courriel);
        Data.push(newContact);
        // console.log(Data);
    }
    
    CreateTable();
    SetButtonEvents();
    ResetFormContent();
}

function ModifierEntree(e)
{
    e.preventDefault();

    DOMlegend.textContent = "Modifier contact";
    DOMsubmit.classList.add("submitModifier");
    DOMsubmit.value = "Modifier";
    isModify = true;

    modifyId = Number(e.target.parentNode.parentNode.dataset.id);
    let obj = Data.find(el=>el.id == modifyId);

    DOMform.querySelector(`input[value="${obj.titre}"]`).checked = true;
    DOMform.querySelector(`input[name="Nom"]`).value = obj.nom;
    DOMform.querySelector(`input[name="Prenom"]`).value = obj.prenom;

    let maDate = new Date(obj.naissance);
    let annee = maDate.getFullYear();
    let mois = (maDate.getMonth()+1).toString().padStart(2, '0');
    let jour = (maDate.getDate()+1).toString().padStart(2, '0');
    let champDate = `${annee}-${mois}-${jour}`;
    DOMform.querySelector(`input[name="Date"]`).value = champDate;

    DOMform.querySelector(`input[name="Telephone"]`).value = obj.telephone;
    DOMform.querySelector(`input[name="Courriel"]`).value = obj.courriel;
}

function SupprimerEntree(e)
{
    e.preventDefault();

    let obj = Data.find(el=>el.id == Number(e.target.parentNode.parentNode.dataset.id));
    Data.splice(Data.indexOf(obj), 1);
    CreateTable();
    SetButtonEvents();
    ResetFormContent();
    ResetFormModify();
}

function ResetFormModify(e)
{
    if(isModify)
    {
        DOMlegend.textContent = "Ajouter contact";
        DOMsubmit.classList.remove("submitModifier");
        DOMsubmit.value = "Ajouter";
        isModify = false;
    }
}

function SetButtonEvents()
{
    DOMmodifier = document.querySelectorAll(".modifier");
    for (const item of DOMmodifier) {
        item.addEventListener("click", ModifierEntree);
    }
    
    DOMsupprimer = document.querySelectorAll(".supprimer");
    for (const item of DOMsupprimer) {
        item.addEventListener("click", SupprimerEntree);
    }
}

// ----------------------------------------------------
// CHARGEMENT DOM

window.addEventListener('DOMContentLoaded', (e) =>
{
    DOMtable = document.querySelector("#tableau");
    
    CreateTable();

    DOMform = document.querySelector("form");
    DOMform.addEventListener("submit", SubmitForm);

    SetButtonEvents();

    DOMlegend = document.querySelector("legend");

    DOMsubmit = document.querySelector('input[type="submit"]');

    DOMreset = document.querySelector('input[type=reset]');
    DOMreset.addEventListener("click", ResetFormModify);
    
});
// ----------------------------------------------------