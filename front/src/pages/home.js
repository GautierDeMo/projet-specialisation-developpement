export default function render(container) {
  container.innerHTML = `
     <div class="flex justify-center bg-blue-50 min-h-screen pt-10">
        <a href="#/stats" class="text-gray-700 italic font-semibold hover:underline">
           Voir les statistiques des produits
        </a>
      </div>
  `
}
