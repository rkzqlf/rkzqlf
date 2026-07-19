// ==========================================================
// rkz_qlf — Réseaux & Statistiques
// Toute la logique d'authentification (clés API, tokens) est
// VOLONTAIREMENT laissée en placeholder. Rien n'est appelé
// tant que tu n'as pas complété les zones marquées
// "REMPLACE PAR TA CLÉ API ICI".
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  initRefreshButtons();
  initContactForm();
  loadAllStats();
});

/* ==========================================================
   1. STATISTIQUES RÉSEAUX SOCIAUX
   ----------------------------------------------------------
   Chaque plateforme a sa propre fonction fetchXStats().
   Elles sont toutes désactivées par défaut (return anticipé)
   tant que la clé/le token correspondant n'est pas renseigné.

   ⚠️ IMPORTANT — limites techniques à connaître avant de
   coller tes clés directement ici :

   - Instagram Graph API, TikTok Display API et X (Twitter) API
     v2 BLOQUENT en général les requêtes faites directement
     depuis un navigateur (pas d'en-tête CORS autorisé) et/ou
     exigent que le token secret ne soit jamais exposé côté
     client. Pour ces trois plateformes, il faut normalement
     un petit relais serveur (une fonction serverless Vercel/
     Netlify/Cloudflare Worker par ex.) qui appelle l'API et
     renvoie juste le nombre à ce site. Ce fichier ne contient
     pas ce relais — seulement l'endroit où appeler ton propre
     relais une fois qu'il existe.
   - YouTube Data API v3 est la seule à autoriser un appel
     direct depuis le navigateur avec une clé API "publique"
     restreinte (referrer HTTP), donc c'est la plus simple à
     brancher telle quelle.
   - Snapchat ne fournit aucune API publique donnant le nombre
     d'abonnés d'un compte tiers : ce chiffre reste manuel.
   ========================================================== */

async function loadAllStats() {
  await Promise.allSettled([
    fetchInstagramStats(),
    fetchTikTokStats(),
    fetchYouTubeStats(),
    fetchTwitterStats(),
    fetchSnapchatStats(),
  ]);
  updateGlobalStatus();
}

/* ---------- Instagram (Graph API) ---------- */
async function fetchInstagramStats() {
  // REMPLACE PAR TA CLÉ API ICI (Instagram Graph API — access token + IG User ID)
  const IG_ACCESS_TOKEN = null; // ex: "IGQWR..."
  const IG_USER_ID = null;      // ex: "17841400000000000"

  if (!IG_ACCESS_TOKEN || !IG_USER_ID) {
    setNotConfigured("ig-followers", "ig-updated");
    return;
  }

  try {
    // Exemple d'appel (à faire passer par ton propre relais serveur — voir README) :
    // const res = await fetch(`https://graph.facebook.com/v19.0/${IG_USER_ID}?fields=followers_count,media_count&access_token=${IG_ACCESS_TOKEN}`);
    // const data = await res.json();
    // setMetric("ig-followers", data.followers_count);
    // setMetric("ig-likes", data.media_count); // adapte selon la métrique voulue
    // markUpdated("ig-updated");
  } catch (err) {
    setError("ig-updated");
  }
}

/* ---------- TikTok (Display API) ---------- */
async function fetchTikTokStats() {
  // REMPLACE PAR TA CLÉ API ICI (TikTok Display API — client key/secret + access token)
  const TIKTOK_ACCESS_TOKEN = null;
  const TIKTOK_OPEN_ID = null;

  if (!TIKTOK_ACCESS_TOKEN || !TIKTOK_OPEN_ID) {
    setNotConfigured("tk-followers", "tk-updated");
    return;
  }

  try {
    // Exemple d'appel (via ton relais serveur) :
    // const res = await fetch("https://open.tiktokapis.com/v2/user/info/?fields=follower_count,likes_count", {
    //   headers: { Authorization: `Bearer ${TIKTOK_ACCESS_TOKEN}` }
    // });
    // const data = await res.json();
    // setMetric("tk-followers", data.data.user.follower_count);
    // setMetric("tk-likes", data.data.user.likes_count);
    // markUpdated("tk-updated");
  } catch (err) {
    setError("tk-updated");
  }
}

/* ---------- YouTube (Data API v3) ---------- */
async function fetchYouTubeStats() {
  // REMPLACE PAR TA CLÉ API ICI (clé API YouTube Data v3, restreinte par referrer HTTP)
  const YT_API_KEY = null;      // ex: "AIzaSy..."
  const YT_CHANNEL_ID = null;   // ex: "UCxxxxxxxxxxxxxxxxxxxxxx"

  if (!YT_API_KEY || !YT_CHANNEL_ID) {
    setNotConfigured("yt-subscribers", "yt-updated");
    return;
  }

  try {
    // Cette API autorise l'appel direct depuis le navigateur :
    // const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YT_CHANNEL_ID}&key=${YT_API_KEY}`);
    // const data = await res.json();
    // const stats = data.items[0].statistics;
    // setMetric("yt-subscribers", stats.subscriberCount);
    // setMetric("yt-views", stats.viewCount);
    // markUpdated("yt-updated");
  } catch (err) {
    setError("yt-updated");
  }
}

/* ---------- X / Twitter (API v2) ---------- */
async function fetchTwitterStats() {
  // REMPLACE PAR TA CLÉ API ICI (X API v2 — Bearer Token)
  const X_BEARER_TOKEN = null;
  const X_USER_ID = null;

  if (!X_BEARER_TOKEN || !X_USER_ID) {
    setNotConfigured("x-followers", "x-updated");
    return;
  }

  try {
    // Exemple d'appel (via ton relais serveur — le Bearer Token ne doit jamais
    // apparaître dans du code exécuté côté navigateur) :
    // const res = await fetch(`https://api.twitter.com/2/users/${X_USER_ID}?user.fields=public_metrics`, {
    //   headers: { Authorization: `Bearer ${X_BEARER_TOKEN}` }
    // });
    // const data = await res.json();
    // setMetric("x-followers", data.data.public_metrics.followers_count);
    // setMetric("x-likes", data.data.public_metrics.like_count);
    // markUpdated("x-updated");
  } catch (err) {
    setError("x-updated");
  }
}

/* ---------- Snapchat ---------- */
async function fetchSnapchatStats() {
  // Snapchat n'expose pas le nombre d'abonnés d'un profil via une API publique.
  // Tu peux mettre à jour ce chiffre manuellement ci-dessous si tu veux
  // l'afficher quand même (valeur statique, pas "en temps réel") :
  const SNAPCHAT_MANUAL_FOLLOWERS = null; // ex: 1200

  if (SNAPCHAT_MANUAL_FOLLOWERS === null) {
    setNotConfigured("sc-followers", "sc-updated");
    return;
  }
  setMetric("sc-followers", SNAPCHAT_MANUAL_FOLLOWERS);
  document.getElementById("sc-updated").textContent = "Mis à jour manuellement";
}

/* ---------- helpers d'affichage ---------- */
function setMetric(id, value) {
  const el = document.getElementById(id);
  if (!el || value === undefined || value === null) return;
  const num = Number(value);
  el.textContent = Number.isFinite(num) ? num.toLocaleString("fr-FR") : value;
}

function setNotConfigured(metricId, updatedId) {
  const metricEl = document.getElementById(metricId);
  const updatedEl = document.getElementById(updatedId);
  if (metricEl) metricEl.textContent = "—";
  if (updatedEl) updatedEl.textContent = "Non connecté";
}

function markUpdated(updatedId) {
  const el = document.getElementById(updatedId);
  if (el) el.textContent = "Mis à jour à l'instant";
}

function setError(updatedId) {
  const el = document.getElementById(updatedId);
  if (el) el.textContent = "Erreur de connexion à l'API";
}

function updateGlobalStatus() {
  const pill = document.getElementById("statusPill");
  const text = document.getElementById("statusText");
  const anyConfigured = document.querySelectorAll(".updated-at").length &&
    Array.from(document.querySelectorAll(".updated-at")).some(
      (el) => el.textContent !== "Non connecté"
    );
  if (anyConfigured) {
    pill.classList.add("is-live");
    text.textContent = "Données en direct";
  } else {
    pill.classList.remove("is-live");
    text.textContent = "Données à configurer";
  }
}

/* ---------- boutons de rafraîchissement individuels ---------- */
function initRefreshButtons() {
  document.querySelectorAll(".btn-refresh").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const platform = btn.dataset.refresh;
      btn.classList.add("is-spinning");
      const fns = {
        instagram: fetchInstagramStats,
        tiktok: fetchTikTokStats,
        youtube: fetchYouTubeStats,
        twitter: fetchTwitterStats,
        snapchat: fetchSnapchatStats,
      };
      if (fns[platform]) await fns[platform]();
      updateGlobalStatus();
      setTimeout(() => btn.classList.remove("is-spinning"), 300);
    });
  });
}

/* ==========================================================
   2. FORMULAIRE DE CONTACT — envoi d'email réellement fonctionnel
   ----------------------------------------------------------
   Utilise EmailJS (https://www.emailjs.com), un service qui
   envoie de vrais emails directement depuis le navigateur,
   sans backend à héberger. La "clé publique" EmailJS est
   conçue pour être visible côté client — ce n'est pas un
   secret, contrairement aux tokens des réseaux sociaux
   ci-dessus.

   Étapes (détaillées dans le README.md) :
   1. Crée un compte gratuit sur emailjs.com
   2. Connecte ta boîte mail (Gmail, Outlook...) comme "service"
   3. Crée un "template" d'email
   4. Colle les 3 identifiants ci-dessous
   ========================================================== */

const EMAILJS_PUBLIC_KEY = null;   // REMPLACE PAR TA CLÉ API ICI (EmailJS → Account → Public Key)
const EMAILJS_SERVICE_ID = null;   // REMPLACE PAR TON ID ICI (EmailJS → Email Services)
const EMAILJS_TEMPLATE_ID = null;  // REMPLACE PAR TON ID ICI (EmailJS → Email Templates)

function initContactForm() {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("contactMsg");
  const submitBtn = document.getElementById("contactSubmit");
  if (!form) return;

  if (EMAILJS_PUBLIC_KEY && window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.classList.remove("is-error");

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      msg.textContent =
        "Formulaire pas encore connecté : complète EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID et EMAILJS_TEMPLATE_ID dans script.js (voir README.md).";
      msg.classList.add("is-error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours...";

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      msg.textContent = "Message envoyé — merci, je te réponds vite !";
      form.reset();
    } catch (err) {
      msg.textContent = "L'envoi a échoué. Réessaie dans un instant.";
      msg.classList.add("is-error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Envoyer le message";
    }
  });
}
