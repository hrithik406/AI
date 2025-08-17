window.addEventListener("DOMContentLoaded", (e) =>{

            const groceryProducts = [
            {
                id: 1, name: 'Organic Red Apples', category: 'fruits',
                image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400',
                price: 4.99, originalPrice: 5.99, rating: 4.5, reviews: 128,
                description: 'Fresh, crispy organic red apples. Perfect for snacking or baking.',
                stock: 25, unit: '/lb'
            },
            {
                id: 2, name: 'Fresh Bananas', category: 'fruits',
                image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
                price: 2.49, originalPrice: null, rating: 4.3, reviews: 89,
                description: 'Sweet, ripe bananas perfect for smoothies and breakfast.',
                stock: 40, unit: '/bunch'
            },
            {
                id: 3, name: 'Organic Carrots', category: 'vegetables',
                image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400',
                price: 3.29, originalPrice: 3.99, rating: 4.7, reviews: 156,
                description: 'Fresh organic carrots, great for cooking and juicing.',
                stock: 12, unit: '/2lb bag'
            },
            {
                id: 4, name: 'Whole Milk', category: 'dairy',
                image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
                price: 3.99, originalPrice: null, rating: 4.2, reviews: 203,
                description: 'Fresh whole milk from local farms. Rich and creamy.',
                stock: 18, unit: '/gallon'
            },
            {
                id: 5, name: 'Free Range Eggs', category: 'dairy',
                image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400',
                price: 5.49, originalPrice: 6.49, rating: 4.8, reviews: 342,
                description: 'Farm-fresh free range eggs. Grade A large.',
                stock: 6, unit: '/dozen'
            },
            {
                id: 6, name: 'Fresh Broccoli', category: 'vegetables',
                image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400',
                price: 2.99, originalPrice: null, rating: 4.1, reviews: 74,
                description: 'Fresh green broccoli crowns. High in vitamins and fiber.',
                stock: 22, unit: '/head'
            },
            {
                id: 7, name: 'Chicken Breast', category: 'meat',
                image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
                price: 8.99, originalPrice: 9.99, rating: 4.6, reviews: 267,
                description: 'Boneless, skinless chicken breast. Fresh and lean.',
                stock: 3, unit: '/lb'
            },
            {
                id: 8, name: 'Strawberries', category: 'fruits',
                image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
                price: 4.49, originalPrice: null, rating: 4.4, reviews: 198,
                description: 'Sweet, juicy strawberries. Perfect for desserts and snacking.',
                stock: 15, unit: '/lb'
            },
            {
                id: 9, name: 'Basmati Rice', category: 'pantry',
                image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
                price: 6.99, originalPrice: 8.49, rating: 4.5, reviews: 412,
                description: 'Premium long-grain basmati rice. Aromatic and fluffy.',
                stock: 28, unit: '/5lb bag'
            },
            {
                id: 10, name: 'Cheddar Cheese', category: 'dairy',
                image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32b?w=400',
                price: 5.99, originalPrice: null, rating: 4.3, reviews: 156,
                description: 'Sharp aged cheddar cheese. Perfect for sandwiches and cooking.',
                stock: 14, unit: '/8oz block'
            },
            {
                id: 11, name: 'Bell Peppers', category: 'vegetables',
                image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
                price: 3.99, originalPrice: 4.49, rating: 4.0, reviews: 89,
                description: 'Colorful bell peppers. Sweet and crunchy.',
                stock: 0, unit: '/3-pack'
            },
            {
                id: 12, name: 'Whole Wheat Bread', category: 'pantry',
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
                price: 3.49, originalPrice: null, rating: 4.2, reviews: 234,
                description: 'Fresh baked whole wheat bread. Soft and nutritious.',
                stock: 19, unit: '/loaf'
            }
        ];

            class GroceryStore {
            constructor() {
                // Search functionality
                this.searchInput = document.getElementById('searchInput');
                this.searchDropdown = document.getElementById('searchDropdown');
                this.clearBtn = document.getElementById('clearBtn');
                this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
                this.historySection = document.getElementById('historySection');
                this.historyList = document.getElementById('historyList');
                this.suggestionsSection = document.getElementById('suggestionsSection');
                this.suggestionsList = document.getElementById('suggestionsList');
                this.noResults = document.getElementById('noResults');
                
                // Products functionality
                this.productsGrid = document.getElementById('productsGrid');
                this.productsTitle = document.getElementById('productsTitle');
                this.filterButtons = document.querySelectorAll('.filter-btn');
                
                this.searchHistory = this.getStoredHistory();
                this.currentHighlighted = -1;
                this.currentFilter = 'all';
                this.currentSearchQuery = '';
                
                this.init();
                this.renderProducts();
            }
            
            init() {
                // Search event listeners
                this.searchInput.addEventListener('input', (e) => this.handleInput(e));
                this.searchInput.addEventListener('focus', () => this.showDropdown());
                this.searchInput.addEventListener('keydown', (e) => this.handleKeydown(e));
                this.clearBtn.addEventListener('click', () => this.clearSearch());
                this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
                
                // Filter event listeners
                this.filterButtons.forEach(btn => {
                    btn.addEventListener('click', (e) => this.handleFilter(e));
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!e.target.closest('.search-container')) {
                        this.hideDropdown();
                    }
                });
            }
            
            handleInput(e) {
                const query = e.target.value.trim();
                this.currentSearchQuery = query;
                this.toggleClearButton(query);
                
                if (query.length === 0) {
                    this.showHistory();
                    this.updateProductsTitle('Fresh Products');
                    this.renderProducts();
                } else {
                    this.showSuggestions(query);
                    this.updateProductsTitle(`Search Results for "${query}"`);
                    this.renderProducts();
                }
            }
            
            handleKeydown(e) {
                if (!this.searchDropdown.classList.contains('show')) return;
                
                const items = this.searchDropdown.querySelectorAll('.search-item');
                
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        this.currentHighlighted = Math.min(this.currentHighlighted + 1, items.length - 1);
                        this.updateHighlight(items);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this.currentHighlighted = Math.max(this.currentHighlighted - 1, -1);
                        this.updateHighlight(items);
                        break;
                    case 'Enter':
                        e.preventDefault();
                        if (this.currentHighlighted >= 0 && items[this.currentHighlighted]) {
                            this.selectItem(items[this.currentHighlighted].getAttribute('data-text'));
                        } else {
                            this.performSearch(this.searchInput.value);
                        }
                        break;
                    case 'Escape':
                        this.hideDropdown();
                        this.searchInput.blur();
                        break;
                }
            }
            
            handleFilter(e) {
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.category;
                this.renderProducts();
            }
            
            updateHighlight(items) {
                items.forEach((item, index) => {
                    item.classList.toggle('highlighted', index === this.currentHighlighted);
                });
                
                if (this.currentHighlighted >= 0 && items[this.currentHighlighted]) {
                    items[this.currentHighlighted].scrollIntoView({ block: 'nearest' });
                }
            }
            
            showDropdown() {
                const query = this.searchInput.value.trim();
                
                if (query.length === 0) {
                    this.showHistory();
                } else {
                    this.showSuggestions(query);
                }
                
                this.searchDropdown.classList.add('show');
                this.currentHighlighted = -1;
            }
            
            hideDropdown() {
                this.searchDropdown.classList.remove('show');
                this.currentHighlighted = -1;
            }
            
            showHistory() {
                this.hideAllSections();
                
                if (this.searchHistory.length > 0) {
                    this.historySection.classList.remove('hidden');
                    this.renderHistory();
                } else {
                    this.hideDropdown();
                }
            }
            
            showSuggestions(query) {
                this.hideAllSections();
                
                const suggestions = this.getSuggestions(query);
                
                if (suggestions.length > 0) {
                    this.suggestionsSection.classList.remove('hidden');
                    this.renderSuggestions(suggestions, query);
                } else {
                    this.noResults.classList.remove('hidden');
                }
            }
            
            hideAllSections() {
                this.historySection.classList.add('hidden');
                this.suggestionsSection.classList.add('hidden');
                this.noResults.classList.add('hidden');
            }
            
            getSuggestions(query) {
                const lowerQuery = query.toLowerCase();
                return groceryProducts
                    .map(product => product.name)
                    .filter(name => name.toLowerCase().includes(lowerQuery))
                    .slice(0, 8);
            }
            
            renderHistory() {
                this.historyList.innerHTML = this.searchHistory
                    .slice(-5)
                    .reverse()
                    .map(item => this.createSearchItem(item, 'history'))
                    .join('');
                
                this.addItemListeners();
            }
            
            renderSuggestions(suggestions, query) {
                this.suggestionsList.innerHTML = suggestions
                    .map(item => this.createSearchItem(item, 'suggestion', query))
                    .join('');
                
                this.addItemListeners();
            }
            
            createSearchItem(text, type, query = '') {
                const badge = type === 'history' 
                    ? '<span class="badge history-badge">Recent</span>'
                    : '<span class="badge suggestion-badge">Suggested</span>';
                
                let displayText = text;
                if (query && type === 'suggestion') {
                    const regex = new RegExp(`(${query})`, 'gi');
                    displayText = text.replace(regex, '<strong>$1</strong>');
                }
                
                const icon = type === 'history' 
                    ? '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
                    : '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>';
                
                return `
                    <div class="search-item" data-text="${text}">
                        <div class="search-item-content">
                            ${icon}
                            <span class="search-item-text">${displayText}</span>
                        </div>
                        ${badge}
                    </div>
                `;
            }
            
            addItemListeners() {
                const items = this.searchDropdown.querySelectorAll('.search-item');
                items.forEach(item => {
                    item.addEventListener('click', () => {
                        this.selectItem(item.getAttribute('data-text'));
                    });
                });
            }
            
            selectItem(text) {
                this.searchInput.value = text;
                this.performSearch(text);
            }
            
            performSearch(query) {
                if (query.trim()) {
                    this.addToHistory(query.trim());
                    this.currentSearchQuery = query.trim();
                    this.updateProductsTitle(`Search Results for "${query}"`);
                    this.renderProducts();
                }
                this.hideDropdown();
            }
            
            addToHistory(query) {
                if (!this.searchHistory.includes(query)) {
                    this.searchHistory.push(query);
                    if (this.searchHistory.length > 10) {
                        this.searchHistory.shift();
                    }
                    this.saveHistory();
                }
            }
            
            clearSearch() {
                this.searchInput.value = '';
                this.currentSearchQuery = '';
                this.searchInput.focus();
                this.toggleClearButton('');
                this.updateProductsTitle('Fresh Products');
                this.renderProducts();
                this.showHistory();
            }
            
            clearHistory() {
                this.searchHistory = [];
                this.saveHistory();
                this.hideDropdown();
            }
            
            toggleClearButton(query) {
                if (query.length > 0) {
                    this.clearBtn.classList.remove('hidden');
                } else {
                    this.clearBtn.classList.add('hidden');
                }
            }
            
            updateProductsTitle(title) {
                this.productsTitle.textContent = title;
            }
            
            // Products functionality
            renderProducts() {
                const filteredProducts = this.getFilteredProducts();
                
                if (filteredProducts.length === 0) {
                    this.productsGrid.innerHTML = `
                        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                            <p style="color: #6b7280; font-size: 1.125rem;">No products found</p>
                            <p style="color: #9ca3af; margin-top: 0.5rem;">Try adjusting your search or filter</p>
                        </div>
                    `;
                    return;
                }
                
                this.productsGrid.innerHTML = filteredProducts
                    .map(product => this.createProductCard(product))
                    .join('');
                
                this.addProductListeners();
            }
            
            getFilteredProducts() {
                let filtered = groceryProducts;
                
                // Filter by category
                if (this.currentFilter !== 'all') {
                    filtered = filtered.filter(product => product.category === this.currentFilter);
                }
                
                // Filter by search query
                if (this.currentSearchQuery) {
                    const query = this.currentSearchQuery.toLowerCase();
                    filtered = filtered.filter(product => 
                        product.name.toLowerCase().includes(query) ||
                        product.description.toLowerCase().includes(query) ||
                        product.category.toLowerCase().includes(query)
                    );
                }
                
                return filtered;
            }
            
            createProductCard(product) {
                const discount = product.originalPrice ? 
                    Math.round((1 - product.price / product.originalPrice) * 100) : 0;
                
                const stockStatus = product.stock === 0 ? 'out-of-stock' :
                                   product.stock < 10 ? 'low-stock' : 'in-stock';
                
                const stockText = product.stock === 0 ? 'Out of Stock' :
                                 product.stock < 10 ? `Only ${product.stock} left` : 'In Stock';
                
                const stars = this.generateStars(product.rating);
                
                return `
                    <div class="product-card" data-id="${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                        <div class="product-info">
                            <div class="product-header">
                                <div>
                                    <h3 class="product-name">${product.name}</h3>
                                    <span class="product-category">${product.category}</span>
                                </div>
                                ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ''}
                            </div>
                            
                            <p class="product-description">${product.description}</p>
                            
                            <div class="product-rating">
                                <div class="stars">${stars}</div>
                                <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                            </div>
                            
                            <div class="product-footer">
                                <div class="product-price">
                                    <span class="current-price">${product.price.toFixed(2)}${product.unit}</span>
                                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice.toFixed(2)}</span>` : ''}
                                </div>
                                <button class="add-to-cart" ${product.stock === 0 ? 'disabled' : ''} data-id="${product.id}">
                                    ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </button>
                            </div>
                            
                            <div class="stock-status ${stockStatus}">${stockText}</div>
                        </div>
                    </div>
                `;
            }
            
            generateStars(rating) {
                const fullStars = Math.floor(rating);
                const hasHalfStar = rating % 1 >= 0.5;
                const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
                
                let stars = '';
                
                // Full stars
                for (let i = 0; i < fullStars; i++) {
                    stars += '<svg class="star" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
                }
                
                // Half star (if needed)
                if (hasHalfStar) {
                    stars += '<svg class="star" fill="currentColor" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="#d1d5db"/></linearGradient></defs><path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
                }
                
                // Empty stars
                for (let i = 0; i < emptyStars; i++) {
                    stars += '<svg class="star empty" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
                }
                
                return stars;
            }
            
            addProductListeners() {
                const addToCartButtons = document.querySelectorAll('.add-to-cart');
                const productCards = document.querySelectorAll('.product-card');
                
                addToCartButtons.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const productId = parseInt(btn.dataset.id);
                        this.addToCart(productId);
                    });
                });
                
                productCards.forEach(card => {
                    card.addEventListener('click', () => {
                        const productId = parseInt(card.dataset.id);
                        this.viewProduct(productId);
                    });
                });
            }
            
            addToCart(productId) {
                const product = groceryProducts.find(p => p.id === productId);
                if (product && product.stock > 0) {
                    // Simulate adding to cart
                    alert(`Added ${product.name} to cart!`);
                    console.log('Added to cart:', product);
                }
            }
            
            viewProduct(productId) {
                const product = groceryProducts.find(p => p.id === productId);
                if (product) {
                    alert(`Viewing ${product.name}\n\nPrice: ${product.price}${product.unit}\nRating: ${product.rating}/5\nStock: ${product.stock}\n\n${product.description}`);
                    console.log('Viewing product:', product);
                }
            }
            
            getStoredHistory() {
                const history = sessionStorage.getItem('searchHistory');
                return history ? JSON.parse(history) : [];
            }
            
            saveHistory() {
                sessionStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
            }
        }
        
        // Initialize the grocery store when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new GroceryStore();
        });

        })

       