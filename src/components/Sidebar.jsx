import { useState } from 'react';
import { Button, Dropdown, Label } from "@heroui/react";
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const cerrarMenuMovil = () => {
        setIsOpen(false);
    };

    const navigateAndClose = (path) => {
        navigate(path);
        cerrarMenuMovil();
    };

    return (
        <>
            <div className="lg:hidden flex items-center justify-between p-4 bg-content1 border-b border-divider fixed top-0 left-0 right-0 z-40">
                <span className="font-semibold text-xl text-foreground">Menu</span>

                {!isOpen && (
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="py-2 px-3 inline-flex justify-center items-center text-sm font-medium rounded-lg shadow-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                        Abrir menu
                    </button>
                )}
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`
        fixed top-0 bottom-0 left-0 h-full w-72 transition-transform duration-300 transform z-50
        bg-white dark:bg-zinc-900 border-r border-divider flex flex-col
        lg:translate-x-0 lg:z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
            >
                <div className="relative flex flex-col h-full max-h-full">
                    <header className="p-6 flex justify-between items-center border-b border-divider">
                        <a className="font-semibold text-2xl text-foreground" href="#">
                            Menu
                        </a>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden flex justify-center items-center w-7 h-7 bg-default-100 border border-divider text-default-600 hover:bg-default-200 rounded-full"
                        >
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </header>

                    <nav className="h-full overflow-y-auto px-5 py-6">
                        <ul className="space-y-3">
                            <li>
                                <NavLink
                                    className={({ isActive }) =>
                                        `block rounded-xl px-4 py-3 text-base font-semibold transition ${isActive
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-foreground hover:bg-default-100"
                                        }`
                                    }
                                    onClick={cerrarMenuMovil}
                                    to="/tareas"
                                >
                                    Tareas
                                </NavLink>
                            </li>

                            <li className="w-full">
                                <Dropdown>
                                    <Button
                                        aria-label="Menu metas"
                                        variant="ghost"
                                        className="w-full rounded-xl px-4 py-3 text-base font-semibold"
                                    >
                                        Metas
                                    </Button>
                                    <Dropdown.Popover>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                id="agregar-meta"
                                                textValue="Agregar meta"
                                                onClick={() => navigateAndClose('/metas-form-agregar-meta')}
                                            >
                                                <Label>Agregar meta</Label>
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                id="ver-metas"
                                                textValue="Ver metas"
                                                onClick={() => navigateAndClose('/metas-list')}
                                            >
                                                <Label>Ver metas</Label>
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                id="metricas-metas"
                                                textValue="Ver metricas"
                                                onClick={() => navigateAndClose('/metricas-de-metas')}
                                            >
                                                <Label>Ver metricas</Label>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown>
                            </li>

                            <li className="w-full">
                                <Dropdown>
                                    <Button
                                        aria-label="Menu categorias"
                                        variant="ghost"
                                        className="w-full rounded-xl px-4 py-3 text-base font-semibold"
                                    >
                                        Categorias
                                    </Button>
                                    <Dropdown.Popover>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                id="categorias"
                                                textValue="Categorias"
                                                onClick={() => navigateAndClose('/categorias')}
                                            >
                                                <Label>Ingresar Categoria</Label>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
