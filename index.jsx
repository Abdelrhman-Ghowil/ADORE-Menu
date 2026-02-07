import { useState, useEffect, useRef } from "react";

const INITIAL_MENU = {
  restaurant: {
    name: "La Maison",
    tagline: "Restaurant & Café",
    description: "Where culinary artistry meets warm hospitality",
    logo: "🍽️",
    currency: "EGP",
  },
  categories: [
    {
      id: "hot-drinks",
      name: "Hot Drinks",
      icon: "☕",
      items: [
        { id: "h1", name: "Espresso", description: "Rich, bold single shot", price: 35, image: "", available: true },
        { id: "h2", name: "Cappuccino", description: "Espresso with steamed milk foam", price: 50, image: "", available: true },
        { id: "h3", name: "Café Latte", description: "Smooth espresso with velvety milk", price: 55, image: "", available: true },
        { id: "h4", name: "Turkish Coffee", description: "Traditional finely ground coffee", price: 30, image: "", available: true },
        { id: "h5", name: "Hot Chocolate", description: "Rich Belgian chocolate blend", price: 55, image: "", available: true },
        { id: "h6", name: "Mint Tea", description: "Fresh mint leaves, honey optional", price: 35, image: "", available: true },
      ],
    },
    {
      id: "cold-drinks",
      name: "Cold Drinks",
      icon: "🧊",
      items: [
        { id: "c1", name: "Iced Latte", description: "Chilled espresso with cold milk", price: 60, image: "", available: true },
        { id: "c2", name: "Iced Americano", description: "Double shot over ice", price: 50, image: "", available: true },
        { id: "c3", name: "Fresh Orange Juice", description: "Freshly squeezed oranges", price: 45, image: "", available: true },
        { id: "c4", name: "Mango Smoothie", description: "Blended mango with yogurt", price: 60, image: "", available: true },
        { id: "c5", name: "Lemonade", description: "Fresh lemon, mint & soda", price: 40, image: "", available: true },
        { id: "c6", name: "Mojito", description: "Lime, mint & sparkling water", price: 50, image: "", available: false },
      ],
    },
    {
      id: "breakfast",
      name: "Breakfast",
      icon: "🍳",
      items: [
        { id: "b1", name: "Classic Eggs Benedict", description: "Poached eggs, hollandaise, English muffin", price: 85, image: "", available: true },
        { id: "b2", name: "Avocado Toast", description: "Sourdough, smashed avocado, poached egg", price: 75, image: "", available: true },
        { id: "b3", name: "Full Breakfast Platter", description: "Eggs, toast, cheese, foul, falafel", price: 95, image: "", available: true },
        { id: "b4", name: "Pancake Stack", description: "Fluffy pancakes, berries, maple syrup", price: 70, image: "", available: true },
        { id: "b5", name: "French Toast", description: "Brioche, cinnamon, fresh fruits", price: 65, image: "", available: true },
      ],
    },
    {
      id: "appetizers",
      name: "Appetizers",
      icon: "🥗",
      items: [
        { id: "a1", name: "Caesar Salad", description: "Romaine, parmesan, croutons, caesar dressing", price: 65, image: "", available: true },
        { id: "a2", name: "Soup of the Day", description: "Chef's daily fresh soup with bread", price: 50, image: "", available: true },
        { id: "a3", name: "Bruschetta", description: "Grilled bread, tomato, basil, olive oil", price: 55, image: "", available: true },
        { id: "a4", name: "Hummus Platter", description: "Creamy hummus with warm pita bread", price: 45, image: "", available: true },
        { id: "a5", name: "Mozzarella Sticks", description: "Golden fried with marinara dip", price: 60, image: "", available: true },
      ],
    },
    {
      id: "main-course",
      name: "Main Course",
      icon: "🥩",
      items: [
        { id: "m1", name: "Grilled Chicken Breast", description: "Herb-marinated with roasted vegetables", price: 130, image: "", available: true },
        { id: "m2", name: "Beef Burger", description: "Angus patty, cheddar, brioche bun, fries", price: 120, image: "", available: true },
        { id: "m3", name: "Grilled Salmon", description: "Atlantic salmon, lemon butter sauce, rice", price: 160, image: "", available: true },
        { id: "m4", name: "Pasta Alfredo", description: "Fettuccine, creamy parmesan sauce, chicken", price: 110, image: "", available: true },
        { id: "m5", name: "Margherita Pizza", description: "Fresh mozzarella, basil, tomato sauce", price: 100, image: "", available: true },
        { id: "m6", name: "Mixed Grill Platter", description: "Kofta, chicken, steak with grilled veggies", price: 180, image: "", available: true },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      icon: "🍰",
      items: [
        { id: "d1", name: "Chocolate Lava Cake", description: "Warm molten center, vanilla ice cream", price: 75, image: "", available: true },
        { id: "d2", name: "Crème Brûlée", description: "Classic French custard, caramelized sugar", price: 65, image: "", available: true },
        { id: "d3", name: "Kunafa", description: "Traditional cheese kunafa with sugar syrup", price: 60, image: "", available: true },
        { id: "d4", name: "Tiramisu", description: "Espresso-soaked layers, mascarpone cream", price: 70, image: "", available: true },
        { id: "d5", name: "Ice Cream Sundae", description: "Three scoops, chocolate sauce, whipped cream", price: 55, image: "", available: true },
      ],
    },
  ],
};

// Generate unique IDs
const uid = () => Math.random().toString(36).slice(2, 10);

// ─── STORAGE ──────────────────────────────────────────
const STORAGE_KEY = "lamaison-menu-data";

function loadMenu() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveMenu(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

// ─── ICONS ────────────────────────────────────────────
function PencilIcon() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 3a2.85 2.85 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>;
}
function TrashIcon() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>;
}
function PlusIcon() {
  return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>;
}
function CheckIcon() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>;
}
function XIcon() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>;
}
function EyeIcon() {
  return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}
function SettingsIcon() {
  return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
}
function ArrowUpIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>;
}
function ArrowDownIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>;
}

// ─── CLIENT MENU VIEW ─────────────────────────────────
function ClientView({ menu, onAdminLogin }) {
  const [activeCategory, setActiveCategory] = useState(menu.categories[0]?.id || "");
  const [search, setSearch] = useState("");
  const categoryRefs = useRef({});

  const filteredCategories = menu.categories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => {
      if (!item.available) return false;
      if (!search) return true;
      return item.name.toLowerCase().includes(search.toLowerCase()) ||
             item.description.toLowerCase().includes(search.toLowerCase());
    }),
  })).filter(cat => cat.items.length > 0);

  const scrollToCategory = (id) => {
    setActiveCategory(id);
    categoryRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #1a0e0a 0%, #2c1810 30%, #1a0e0a 100%)",
      fontFamily: "'Playfair Display', Georgia, serif",
      color: "#f5e6d3",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />

      {/* Hero Header */}
      <div style={{
        textAlign: "center",
        padding: "50px 20px 30px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(ellipse at center, rgba(212,165,116,0.08) 0%, transparent 70%)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "48px", marginBottom: "8px", filter: "drop-shadow(0 0 20px rgba(212,165,116,0.3))" }}>
            {menu.restaurant.logo}
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 800,
            color: "#d4a574",
            margin: "0 0 4px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            textShadow: "0 2px 20px rgba(212,165,116,0.3)",
          }}>
            {menu.restaurant.name}
          </h1>
          <p style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
            color: "#b8937a",
            margin: "0 0 6px",
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}>
            {menu.restaurant.tagline}
          </p>
          <div style={{
            width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #d4a574, transparent)",
            margin: "16px auto 12px",
          }} />
          <p style={{
            fontSize: "0.85rem",
            color: "#8a7060",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
          }}>
            {menu.restaurant.description}
          </p>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "0 20px 16px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          background: "rgba(212,165,116,0.08)",
          border: "1px solid rgba(212,165,116,0.15)",
          borderRadius: "50px", padding: "10px 20px",
        }}>
          <span style={{ color: "#8a7060", fontSize: "16px" }}>🔍</span>
          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "#f5e6d3", fontSize: "0.9rem",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{
              background: "none", border: "none", color: "#8a7060", cursor: "pointer", padding: "2px",
            }}>✕</button>
          )}
        </div>
      </div>

      {/* Category Nav */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "linear-gradient(180deg, #1a0e0a 80%, transparent)",
        padding: "12px 0 18px",
      }}>
        <div style={{
          display: "flex", gap: "6px", overflowX: "auto",
          padding: "0 20px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
          {filteredCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              style={{
                flex: "0 0 auto",
                padding: "8px 18px",
                borderRadius: "50px",
                border: activeCategory === cat.id ? "1px solid #d4a574" : "1px solid rgba(212,165,116,0.15)",
                background: activeCategory === cat.id ? "rgba(212,165,116,0.15)" : "rgba(212,165,116,0.04)",
                color: activeCategory === cat.id ? "#d4a574" : "#8a7060",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                letterSpacing: "1px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div style={{ padding: "0 20px 40px", maxWidth: "700px", margin: "0 auto" }}>
        {filteredCategories.map(cat => (
          <div
            key={cat.id}
            ref={el => (categoryRefs.current[cat.id] = el)}
            style={{ marginBottom: "40px", scrollMarginTop: "80px" }}
          >
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "20px", paddingBottom: "12px",
              borderBottom: "1px solid rgba(212,165,116,0.12)",
            }}>
              <span style={{ fontSize: "24px" }}>{cat.icon}</span>
              <h2 style={{
                fontSize: "1.4rem", fontWeight: 700, color: "#d4a574",
                margin: 0, letterSpacing: "2px", textTransform: "uppercase",
              }}>
                {cat.name}
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {cat.items.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    padding: "14px 0",
                    borderBottom: i < cat.items.length - 1 ? "1px solid rgba(212,165,116,0.06)" : "none",
                    animation: `fadeIn 0.4s ease ${i * 0.05}s both`,
                  }}
                >
                  <div style={{ flex: 1, paddingRight: "16px" }}>
                    <h3 style={{
                      fontSize: "1.05rem", fontWeight: 600, color: "#f5e6d3",
                      margin: "0 0 4px",
                      fontFamily: "'Lora', serif",
                    }}>
                      {item.name}
                    </h3>
                    <p style={{
                      fontSize: "0.82rem", color: "#8a7060", margin: 0,
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300, lineHeight: 1.5,
                    }}>
                      {item.description}
                    </p>
                  </div>
                  <div style={{
                    fontSize: "1rem", fontWeight: 600, color: "#d4a574",
                    whiteSpace: "nowrap",
                    fontFamily: "'Lora', serif",
                    paddingTop: "2px",
                  }}>
                    {item.price} <span style={{ fontSize: "0.7rem", color: "#8a7060", fontWeight: 400 }}>{menu.restaurant.currency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#8a7060" }}>
            <p style={{ fontSize: "2rem", marginBottom: "8px" }}>🔍</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif" }}>No items found for "{search}"</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "30px 20px 50px",
        borderTop: "1px solid rgba(212,165,116,0.08)",
      }}>
        <p style={{
          fontSize: "0.75rem", color: "#5a4a3a",
          fontFamily: "'Cormorant Garamond', serif",
          letterSpacing: "2px", textTransform: "uppercase",
        }}>
          {menu.restaurant.name} — {menu.restaurant.tagline}
        </p>
      </div>

      {/* Admin Login FAB */}
      <button
        onClick={onAdminLogin}
        style={{
          position: "fixed", bottom: "24px", right: "24px",
          width: "48px", height: "48px", borderRadius: "50%",
          background: "rgba(42,30,22,0.9)",
          border: "1px solid rgba(212,165,116,0.2)",
          color: "#d4a574", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          transition: "all 0.3s",
          zIndex: 50,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(212,165,116,0.15)";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "rgba(42,30,22,0.9)";
          e.currentTarget.style.transform = "scale(1)";
        }}
        title="Admin Panel"
      >
        <SettingsIcon />
      </button>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { display: none; }
        * { box-sizing: border-box; }
        input::placeholder { color: #6a5a4a; }
      `}</style>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────
function AdminPanel({ menu, setMenu, onViewClient }) {
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingRestaurant, setEditingRestaurant] = useState(false);
  const [tempData, setTempData] = useState({});
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const updateRestaurant = () => {
    setMenu(prev => ({
      ...prev,
      restaurant: { ...prev.restaurant, ...tempData },
    }));
    setEditingRestaurant(false);
    showToast("Restaurant info updated ✓");
  };

  const addCategory = () => {
    const newCat = { id: uid(), name: "New Category", icon: "🍴", items: [] };
    setMenu(prev => ({ ...prev, categories: [...prev.categories, newCat] }));
    showToast("Category added ✓");
  };

  const updateCategory = (catId) => {
    setMenu(prev => ({
      ...prev,
      categories: prev.categories.map(c => c.id === catId ? { ...c, ...tempData } : c),
    }));
    setEditingCategory(null);
    showToast("Category updated ✓");
  };

  const deleteCategory = (catId) => {
    if (!confirm("Delete this entire category and all its items?")) return;
    setMenu(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== catId),
    }));
    showToast("Category deleted ✓");
  };

  const moveCategoryUp = (index) => {
    if (index === 0) return;
    setMenu(prev => {
      const cats = [...prev.categories];
      [cats[index - 1], cats[index]] = [cats[index], cats[index - 1]];
      return { ...prev, categories: cats };
    });
  };

  const moveCategoryDown = (index) => {
    setMenu(prev => {
      if (index >= prev.categories.length - 1) return prev;
      const cats = [...prev.categories];
      [cats[index], cats[index + 1]] = [cats[index + 1], cats[index]];
      return { ...prev, categories: cats };
    });
  };

  const addItem = (catId) => {
    const newItem = { id: uid(), name: "New Item", description: "Description", price: 0, image: "", available: true };
    setMenu(prev => ({
      ...prev,
      categories: prev.categories.map(c =>
        c.id === catId ? { ...c, items: [...c.items, newItem] } : c
      ),
    }));
    showToast("Item added ✓");
  };

  const updateItem = (catId, itemId) => {
    setMenu(prev => ({
      ...prev,
      categories: prev.categories.map(c =>
        c.id === catId
          ? { ...c, items: c.items.map(it => it.id === itemId ? { ...it, ...tempData } : it) }
          : c
      ),
    }));
    setEditingItem(null);
    showToast("Item updated ✓");
  };

  const deleteItem = (catId, itemId) => {
    setMenu(prev => ({
      ...prev,
      categories: prev.categories.map(c =>
        c.id === catId ? { ...c, items: c.items.filter(it => it.id !== itemId) } : c
      ),
    }));
    showToast("Item deleted ✓");
  };

  const toggleAvailability = (catId, itemId) => {
    setMenu(prev => ({
      ...prev,
      categories: prev.categories.map(c =>
        c.id === catId
          ? { ...c, items: c.items.map(it => it.id === itemId ? { ...it, available: !it.available } : it) }
          : c
      ),
    }));
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: "1px solid #334155", background: "#1e293b", color: "#f1f5f9",
    fontSize: "0.9rem", outline: "none", fontFamily: "'Segoe UI', sans-serif",
  };

  const labelStyle = {
    display: "block", fontSize: "0.75rem", fontWeight: 600,
    color: "#94a3b8", marginBottom: "4px", textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const btnPrimary = {
    padding: "8px 16px", borderRadius: "8px", border: "none",
    background: "#3b82f6", color: "white", cursor: "pointer",
    fontSize: "0.85rem", fontWeight: 600,
    display: "inline-flex", alignItems: "center", gap: "6px",
  };

  const btnSecondary = {
    padding: "8px 16px", borderRadius: "8px",
    border: "1px solid #334155", background: "transparent",
    color: "#94a3b8", cursor: "pointer", fontSize: "0.85rem",
    display: "inline-flex", alignItems: "center", gap: "6px",
  };

  const btnDanger = {
    ...btnSecondary, border: "1px solid #7f1d1d", color: "#f87171",
  };

  const totalItems = menu.categories.reduce((sum, c) => sum + c.items.length, 0);
  const availableItems = menu.categories.reduce((sum, c) => sum + c.items.filter(i => i.available).length, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "#f1f5f9",
      fontFamily: "'Segoe UI', -apple-system, sans-serif",
    }}>
      {/* Top Bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 24px",
        background: "#1e293b",
        borderBottom: "1px solid #334155",
        position: "sticky", top: 0, zIndex: 20,
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#f1f5f9" }}>
            ⚙️ Admin Panel
          </h1>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748b" }}>
            Manage your menu
          </p>
        </div>
        <button onClick={onViewClient} style={{
          ...btnPrimary, background: "#10b981",
        }}>
          <EyeIcon /> View Menu
        </button>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px 20px 60px" }}>
        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px",
          marginBottom: "24px",
        }}>
          {[
            { label: "Categories", value: menu.categories.length, color: "#3b82f6" },
            { label: "Total Items", value: totalItems, color: "#8b5cf6" },
            { label: "Available", value: availableItems, color: "#10b981" },
          ].map(stat => (
            <div key={stat.label} style={{
              background: "#1e293b", borderRadius: "12px", padding: "16px",
              border: "1px solid #334155",
            }}>
              <p style={{ margin: 0, fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>{stat.label}</p>
              <p style={{ margin: "4px 0 0", fontSize: "1.5rem", fontWeight: 700, color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Restaurant Info */}
        <div style={{
          background: "#1e293b", borderRadius: "12px", padding: "20px",
          border: "1px solid #334155", marginBottom: "24px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>🏪 Restaurant Info</h2>
            {!editingRestaurant ? (
              <button onClick={() => { setEditingRestaurant(true); setTempData({ ...menu.restaurant }); }} style={btnSecondary}>
                <PencilIcon /> Edit
              </button>
            ) : (
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={updateRestaurant} style={btnPrimary}><CheckIcon /> Save</button>
                <button onClick={() => setEditingRestaurant(false)} style={btnSecondary}><XIcon /></button>
              </div>
            )}
          </div>
          {editingRestaurant ? (
            <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input style={inputStyle} value={tempData.name || ""} onChange={e => setTempData(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label style={labelStyle}>Tagline</label>
                <input style={inputStyle} value={tempData.tagline || ""} onChange={e => setTempData(p => ({ ...p, tagline: e.target.value }))} />
              </div>
              <div>
                <label style={labelStyle}>Logo Emoji</label>
                <input style={inputStyle} value={tempData.logo || ""} onChange={e => setTempData(p => ({ ...p, logo: e.target.value }))} />
              </div>
              <div>
                <label style={labelStyle}>Currency</label>
                <input style={inputStyle} value={tempData.currency || ""} onChange={e => setTempData(p => ({ ...p, currency: e.target.value }))} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Description</label>
                <input style={inputStyle} value={tempData.description || ""} onChange={e => setTempData(p => ({ ...p, description: e.target.value }))} />
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "36px" }}>{menu.restaurant.logo}</span>
              <div>
                <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>{menu.restaurant.name}</p>
                <p style={{ margin: "2px 0", fontSize: "0.85rem", color: "#94a3b8" }}>{menu.restaurant.tagline}</p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>{menu.restaurant.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        {menu.categories.map((cat, catIdx) => (
          <div
            key={cat.id}
            style={{
              background: "#1e293b", borderRadius: "12px", padding: "20px",
              border: "1px solid #334155", marginBottom: "16px",
            }}
          >
            {/* Category Header */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: "16px", flexWrap: "wrap", gap: "8px",
            }}>
              {editingCategory === cat.id ? (
                <div style={{ display: "flex", gap: "8px", flex: 1, flexWrap: "wrap" }}>
                  <input style={{ ...inputStyle, width: "50px", flex: "0 0 50px" }} value={tempData.icon || ""} onChange={e => setTempData(p => ({ ...p, icon: e.target.value }))} placeholder="Icon" />
                  <input style={{ ...inputStyle, flex: 1, minWidth: "120px" }} value={tempData.name || ""} onChange={e => setTempData(p => ({ ...p, name: e.target.value }))} placeholder="Category name" />
                  <button onClick={() => updateCategory(cat.id)} style={btnPrimary}><CheckIcon /></button>
                  <button onClick={() => setEditingCategory(null)} style={btnSecondary}><XIcon /></button>
                </div>
              ) : (
                <>
                  <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 600 }}>
                    {cat.icon} {cat.name}
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 400, marginLeft: "8px" }}>
                      ({cat.items.length} items)
                    </span>
                  </h3>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => moveCategoryUp(catIdx)} style={{ ...btnSecondary, padding: "6px 8px" }} title="Move up"><ArrowUpIcon /></button>
                    <button onClick={() => moveCategoryDown(catIdx)} style={{ ...btnSecondary, padding: "6px 8px" }} title="Move down"><ArrowDownIcon /></button>
                    <button onClick={() => { setEditingCategory(cat.id); setTempData({ name: cat.name, icon: cat.icon }); }} style={{ ...btnSecondary, padding: "6px 8px" }}><PencilIcon /></button>
                    <button onClick={() => deleteCategory(cat.id)} style={{ ...btnDanger, padding: "6px 8px" }}><TrashIcon /></button>
                  </div>
                </>
              )}
            </div>

            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {cat.items.map(item => (
                <div
                  key={item.id}
                  style={{
                    background: item.available ? "#0f172a" : "rgba(15,23,42,0.5)",
                    borderRadius: "10px", padding: "14px",
                    border: `1px solid ${item.available ? "#334155" : "#1e293b"}`,
                    opacity: item.available ? 1 : 0.6,
                    transition: "all 0.2s",
                  }}
                >
                  {editingItem === item.id ? (
                    <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "1fr 1fr" }}>
                      <div>
                        <label style={labelStyle}>Item Name</label>
                        <input style={inputStyle} value={tempData.name || ""} onChange={e => setTempData(p => ({ ...p, name: e.target.value }))} />
                      </div>
                      <div>
                        <label style={labelStyle}>Price</label>
                        <input style={inputStyle} type="number" value={tempData.price || 0} onChange={e => setTempData(p => ({ ...p, price: parseFloat(e.target.value) || 0 }))} />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>Description</label>
                        <input style={inputStyle} value={tempData.description || ""} onChange={e => setTempData(p => ({ ...p, description: e.target.value }))} />
                      </div>
                      <div style={{ gridColumn: "1 / -1", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                        <button onClick={() => updateItem(cat.id, item.id)} style={btnPrimary}><CheckIcon /> Save</button>
                        <button onClick={() => setEditingItem(null)} style={btnSecondary}><XIcon /> Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{item.name}</span>
                          {!item.available && (
                            <span style={{
                              fontSize: "0.65rem", background: "#7f1d1d", color: "#fca5a5",
                              padding: "2px 8px", borderRadius: "50px",
                            }}>UNAVAILABLE</span>
                          )}
                        </div>
                        <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "#64748b" }}>{item.description}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                        <span style={{ fontWeight: 700, color: "#3b82f6", fontSize: "0.95rem" }}>
                          {item.price} {menu.restaurant.currency}
                        </span>
                        <button
                          onClick={() => toggleAvailability(cat.id, item.id)}
                          style={{
                            width: "40px", height: "22px", borderRadius: "11px",
                            border: "none", cursor: "pointer",
                            background: item.available ? "#10b981" : "#374151",
                            position: "relative", transition: "background 0.2s",
                          }}
                        >
                          <div style={{
                            width: "16px", height: "16px", borderRadius: "50%",
                            background: "white", position: "absolute", top: "3px",
                            left: item.available ? "21px" : "3px",
                            transition: "left 0.2s",
                          }} />
                        </button>
                        <button onClick={() => { setEditingItem(item.id); setTempData({ ...item }); }} style={{ ...btnSecondary, padding: "6px 8px" }}><PencilIcon /></button>
                        <button onClick={() => deleteItem(cat.id, item.id)} style={{ ...btnDanger, padding: "6px 8px" }}><TrashIcon /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Item */}
            <button onClick={() => addItem(cat.id)} style={{
              ...btnSecondary, width: "100%", justifyContent: "center",
              marginTop: "10px", borderStyle: "dashed",
            }}>
              <PlusIcon /> Add Item
            </button>
          </div>
        ))}

        {/* Add Category */}
        <button onClick={addCategory} style={{
          ...btnPrimary, width: "100%", justifyContent: "center",
          padding: "14px", fontSize: "0.95rem",
        }}>
          <PlusIcon /> Add New Category
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)",
          background: "#10b981", color: "white", padding: "10px 24px",
          borderRadius: "50px", fontSize: "0.85rem", fontWeight: 600,
          boxShadow: "0 4px 20px rgba(16,185,129,0.3)",
          animation: "slideUp 0.3s ease",
          zIndex: 100,
        }}>
          {toast}
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────
export default function App() {
  const [menu, setMenu] = useState(() => loadMenu() || INITIAL_MENU);
  const [view, setView] = useState("client"); // "client" | "admin"
  const [adminAuth, setAdminAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Auto-save
  useEffect(() => {
    saveMenu(menu);
  }, [menu]);

  const ADMIN_PIN = "1234"; // Default admin PIN

  const handleLogin = () => {
    if (password === ADMIN_PIN) {
      setAdminAuth(true);
      setView("admin");
      setShowLogin(false);
      setPassword("");
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  if (showLogin) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1a0e0a 0%, #2c1810 50%, #1a0e0a 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Segoe UI', sans-serif",
      }}>
        <div style={{
          background: "rgba(30,20,15,0.95)", borderRadius: "16px",
          border: "1px solid rgba(212,165,116,0.15)",
          padding: "40px", width: "340px", textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔐</div>
          <h2 style={{
            color: "#d4a574", margin: "0 0 8px", fontSize: "1.3rem",
            fontFamily: "'Playfair Display', serif",
          }}>Admin Access</h2>
          <p style={{ color: "#8a7060", fontSize: "0.8rem", margin: "0 0 24px" }}>
            Enter PIN to manage menu
          </p>
          <input
            type="password"
            placeholder="Enter PIN"
            value={password}
            onChange={e => { setPassword(e.target.value); setLoginError(false); }}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{
              width: "100%", padding: "12px 16px", borderRadius: "10px",
              border: `1px solid ${loginError ? "#ef4444" : "rgba(212,165,116,0.2)"}`,
              background: "rgba(212,165,116,0.05)", color: "#f5e6d3",
              fontSize: "1.1rem", textAlign: "center",
              letterSpacing: "8px", outline: "none",
            }}
            autoFocus
          />
          {loginError && (
            <p style={{ color: "#ef4444", fontSize: "0.8rem", margin: "8px 0 0" }}>Incorrect PIN</p>
          )}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              onClick={() => { setShowLogin(false); setPassword(""); setLoginError(false); }}
              style={{
                flex: 1, padding: "10px", borderRadius: "10px",
                border: "1px solid rgba(212,165,116,0.15)", background: "transparent",
                color: "#8a7060", cursor: "pointer", fontSize: "0.9rem",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleLogin}
              style={{
                flex: 1, padding: "10px", borderRadius: "10px", border: "none",
                background: "#d4a574", color: "#1a0e0a", cursor: "pointer",
                fontSize: "0.9rem", fontWeight: 600,
              }}
            >
              Enter
            </button>
          </div>
          <p style={{ color: "#5a4a3a", fontSize: "0.7rem", marginTop: "16px" }}>
            Default PIN: 1234
          </p>
        </div>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      </div>
    );
  }

  if (view === "admin" && adminAuth) {
    return <AdminPanel menu={menu} setMenu={setMenu} onViewClient={() => setView("client")} />;
  }

  return <ClientView menu={menu} onAdminLogin={() => setShowLogin(true)} />;
}
