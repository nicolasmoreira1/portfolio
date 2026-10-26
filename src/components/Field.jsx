/**
 * Um campo de formulário com rótulo e mensagem de erro. Usar `as="textarea"`
 * troca o elemento sem duplicar a estrutura em volta.
 */
function Field({ id, label, erro, as = "input", ...props }) {
  const Elemento = as;

  return (
    <div className="campo">
      <label htmlFor={id}>{label}</label>
      <Elemento
        id={id}
        aria-invalid={Boolean(erro)}
        aria-describedby={erro ? `${id}-erro` : undefined}
        {...props}
      />
      {erro && (
        <p className="campo__erro" id={`${id}-erro`}>
          {erro}
        </p>
      )}
    </div>
  );
}

export default Field;
