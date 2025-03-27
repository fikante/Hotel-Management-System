const SidebarNav = ({ isOpen, items, activeItem, onItemClick }) => {
  return (
    <nav className="px-4 w-full py-5">
      <ul className="space-y-3">
        {items.map((item) => {
          const isActive = item.id === activeItem?.id;
          console.log(item.id,activeItem)
          return (
            <li key={item.id}>
              <a
                href={item.path}
                className={`
                  flex items-center p-3  rounded-r-lg transition-colors duration-200 gap-3
                  ${isOpen ? 'justify-start' : 'justify-center'}
                  ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }
                `}
                onClick={(e) => {
                  e.preventDefault();
                  onItemClick(item);
                }}
              >
                <span className={isActive ? 'text-blue-600' : 'text-gray-500'}>
                  {item.icon}
                </span>
                {isOpen && <span className="ml-3 font-serif">{item.name}</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarNav;