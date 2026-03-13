import { NavLink, Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
      <div className="app-layout">
        <aside className="sidebar">
          <h4 className="sidebar__title">Меню</h4>

          <nav className="sidebar__nav">
            <NavLink
                to="/simple-form"
                className={({ isActive }) =>
                    isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
                }
            >
              Простая форма
            </NavLink>

            <NavLink
                to="/tabbed-form"
                className={({ isActive }) =>
                    isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
                }
            >
              Форма с вкладками
            </NavLink>

            <NavLink
                to="/wizard-form"
                className={({ isActive }) =>
                    isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
                }
            >
              Многостраничная форма (Wizard)
            </NavLink>
          </nav>
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>
  );
};
