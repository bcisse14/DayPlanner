const URL = "http://localhost:8001"; // URL de base

// Fonction générique pour les appels API
async function api(method, path, data = {}) {
  const options = {
    method: method,
    headers: {
      Accept: "application/json",
    },
  };

  // Si ce n'est pas une méthode GET, on ajoute les données au body de la requête
  if (method !== "GET") {
    options.body = JSON.stringify(data); // Convertit les données en JSON
    // Choisissez le bon Content-Type en fonction de la méthode
    if (method === "POST") {
      options.headers["Content-Type"] = "application/ld+json"; // Pour POST, on utilise application/json
    } else if (method === "PATCH") {
      options.headers["Content-Type"] = "application/merge-patch+json"; // Pour PATCH, on utilise application/merge-patch+json
    }
  }

  try {
    const response = await fetch(URL + path, options);

    if (!response.ok) {
      // Gère les erreurs HTTP
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur réseau");
    }

    // Si la réponse a un code 204 (No Content), pas de corps à retourner
    if (response.status === 204) {
      return null; // Aucune donnée à renvoyer
    }

    // Sinon, on retourne les données JSON
    return await response.json(); // Retourne les données JSON
  } catch (error) {
    console.error("API error:", error.message);
    throw error; // Propage l'erreur
  }
}

// Fonctions spécifiques pour chaque méthode HTTP
async function get(path, data = {}) {
  return await api("GET", path, data);
}

async function post(path, data = {}) {
  return await api("POST", path, data);
}

async function update(path, data = {}) {
  return await api("PATCH", path, data);
}

async function remove(path, data = {}) {
  return await api("DELETE", path, data);
}

export { get, post, update, remove };
