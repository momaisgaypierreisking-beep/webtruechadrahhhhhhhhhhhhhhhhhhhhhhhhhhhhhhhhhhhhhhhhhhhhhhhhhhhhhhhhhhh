// Hierarchy Card Expand/Collapse Functionality
document.addEventListener('DOMContentLoaded', function() {
	const expandButtons = document.querySelectorAll('.expand-responsibilities');
	
	expandButtons.forEach(button => {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			const card = this.closest('.hierarchy-card');
			const responsibilitiesDiv = card.querySelector('.responsibilities');
			const isExpanded = responsibilitiesDiv.classList.contains('show');
			
			// Close all other expanded cards first
			expandButtons.forEach(btn => {
				if (btn !== this) {
					const otherCard = btn.closest('.hierarchy-card');
					const otherResponsibilities = otherCard.querySelector('.responsibilities');
					
					if (otherResponsibilities.classList.contains('show')) {
						btn.classList.remove('expanded');
						btn.textContent = btn.textContent.includes('Përgjegjësitë') ? 'Përgjegjësitë' : (btn.textContent.includes('Programet') ? 'Programet' : 'Departamentet');
						otherResponsibilities.style.maxHeight = '0px';
						otherResponsibilities.classList.remove('show');
					}
				}
			});
			
			// Toggle current card
			if (isExpanded) {
				// Collapse
				this.classList.remove('expanded');
				const originalText = this.textContent.includes('Përgjegjësitë') ? 'Përgjegjësitë' : (this.textContent.includes('Programet') ? 'Programet' : 'Departamentet');
				this.textContent = originalText;
				responsibilitiesDiv.style.maxHeight = '0px';
				responsibilitiesDiv.classList.remove('show');
			} else {
				// Expand
				this.classList.add('expanded');
				const newText = this.textContent.includes('Përgjegjësitë') ? 'Fshih Përgjegjësitë' : (this.textContent.includes('Programet') ? 'Fshih Programet' : 'Fshih Departamentet');
				this.textContent = newText;
				responsibilitiesDiv.classList.add('show');
				
				// Calculate and set max-height
				setTimeout(() => {
					const scrollHeight = responsibilitiesDiv.scrollHeight;
					responsibilitiesDiv.style.maxHeight = (scrollHeight + 30) + 'px';
				}, 0);
			}
		});
		
		// Keyboard accessibility
		button.addEventListener('keypress', function(e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				this.click();
			}
		});
	});
	
	// Update max-height on window resize
	window.addEventListener('resize', function() {
		const expandedButtons = document.querySelectorAll('.expand-responsibilities.expanded');
		expandedButtons.forEach(btn => {
			const responsibilitiesDiv = btn.closest('.hierarchy-card').querySelector('.responsibilities');
			const scrollHeight = responsibilitiesDiv.scrollHeight;
			responsibilitiesDiv.style.maxHeight = (scrollHeight + 30) + 'px';
		});
	});
});
