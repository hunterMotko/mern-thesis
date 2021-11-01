const InputField =({type, name, value, change, error})=>
  <div className="field">
    <label className="ui label">{name.toUpperCase()}</label>
    <input 
      className={`${error && 'inputError'}`}
      type={`${type}`} 
      name={`${name}`}
      placeholder={`${name} ...`}
      value={value}
      onChange={change}
    />
    {error && <p className="error">{error}</p>}
  </div>

export default InputField