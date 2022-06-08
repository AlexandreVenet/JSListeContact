"use strict";

class Contact
{
    // Champs (publics)
    id;
    titre;
    nom;
    prenom;
    naissance;
    telephone;
    courriel

    constructor(id, titre, nom, prenom, naissance, telephone, courriel)
    {
        this.id = id;
        this.titre = titre;
        this.nom = nom;
        this.prenom = prenom;
        this.naissance = naissance;
        this.telephone = telephone;
        this.courriel = courriel;
    }

}

export default Contact;