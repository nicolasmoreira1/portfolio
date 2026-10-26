function Button({ children, variante = "primario", ...props }) {
  return (
    <button className={`botao botao--${variante}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
