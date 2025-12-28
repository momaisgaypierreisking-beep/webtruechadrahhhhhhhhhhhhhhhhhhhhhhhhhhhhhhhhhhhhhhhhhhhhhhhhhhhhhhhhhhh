	//  funksio i filterit
		const filterBtns = document.querySelectorAll('.filter-btn');
		const staffCards = document.querySelectorAll('.stafi-card');
		const searchInput = document.getElementById('searchInput');

		// filteri kategori
		filterBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				filterBtns.forEach(b => b.classList.remove('aktiv'));
				btn.classList.add('aktiv');

				const filterValue = btn.getAttribute('data-filter');
				applyFilters(filterValue, searchInput.value);
			});
		});

		// Search functionality
		searchInput.addEventListener('input', (e) => {
			const activeFilter = document.querySelector('.filter-btn.aktiv').getAttribute('data-filter');
			applyFilters(activeFilter, e.target.value);
		});

		// Apply both filters and search
		function applyFilters(filterValue, searchValue) {
			staffCards.forEach(card => {
				const category = card.getAttribute('data-category');
				const searchText = card.getAttribute('data-search').toLowerCase();
				const searchLower = searchValue.toLowerCase();

				const categoryMatch = filterValue === 'te-gjitha' || category === filterValue;
				const searchMatch = searchLower === '' || searchText.includes(searchLower);

				if (categoryMatch && searchMatch) {
					card.style.display = 'block';
					card.style.animation = 'fadeIn 0.3s ease-in';
				} else {
					card.style.display = 'none';
				}
			});
		}

		// Add animation
		const style = document.createElement('style');
		style.textContent = `
			@keyframes fadeIn {
				from { opacity: 0; transform: translateY(10px); }
				to { opacity: 1; transform: translateY(0); }
			}
		`;
		document.head.appendChild(style);