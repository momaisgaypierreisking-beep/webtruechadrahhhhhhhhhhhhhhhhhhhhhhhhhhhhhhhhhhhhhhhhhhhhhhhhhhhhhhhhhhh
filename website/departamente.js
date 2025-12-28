// Department Card Expand/Collapse Functionality
document.addEventListener('DOMContentLoaded', function() {
	const expandButtons = document.querySelectorAll('.dept-expand-btn');
	
	expandButtons.forEach(button => {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			const card = this.closest('.dept-card');
			const programsDiv = card.querySelector('.dept-programs');
			const isExpanded = programsDiv.classList.contains('show');
			
			// Close all other expanded cards first
			expandButtons.forEach(btn => {
				if (btn !== this) {
					const otherCard = btn.closest('.dept-card');
					const otherPrograms = otherCard.querySelector('.dept-programs');
					
					if (otherPrograms.classList.contains('show')) {
						btn.classList.remove('expanded');
						btn.textContent = 'Shfaq Programet';
						otherPrograms.style.maxHeight = '0px';
						otherPrograms.classList.remove('show');
					}
				}
			});
			
			// Toggle current card
			if (isExpanded) {
				// Collapse
				this.classList.remove('expanded');
				this.textContent = 'Shfaq Programet';
				programsDiv.style.maxHeight = '0px';
				programsDiv.classList.remove('show');
			} else {
				// Expand
				this.classList.add('expanded');
				this.textContent = 'Fshih Programet';
				programsDiv.classList.add('show');
				
				// Calculate and set max-height
				setTimeout(() => {
					const scrollHeight = programsDiv.scrollHeight;
					programsDiv.style.maxHeight = (scrollHeight + 30) + 'px';
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
		const expandedButtons = document.querySelectorAll('.dept-expand-btn.expanded');
		expandedButtons.forEach(btn => {
			const programsDiv = btn.closest('.dept-card').querySelector('.dept-programs');
			const scrollHeight = programsDiv.scrollHeight;
			programsDiv.style.maxHeight = (scrollHeight + 30) + 'px';
		});
	});
});
