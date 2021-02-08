import Select from "antd/lib/select";

const { Option } = Select;

const Dropdown = (props) => {

  const blacklist = ['BUSD', 'SUSD'];

  const tokens = Object.keys(props.tokens);

  const onChange = (val) => {
    if(props.mode == '1'){
      props.onSelect('tokenIn', val);
    }
    else if(props.mode == '2'){
      if(blacklist.includes(val)){
        alert(`Aave doesn't support borrowing against ${val} asset. Please chose another asset to leverage.`)
      }
      else{
        props.onSelect('leverageToken', val);
      }
    }
    else {
      props.onSelect(val);
    }
  }
  
  const defaultValue = (props.mode == '1' || props.mode == '3') ? "DAI" : "WETH";

  return (
    <Select defaultValue={defaultValue} size={'large'} style={{ width: 120 }} onChange={onChange}>
      {tokens.map((symbol, index) => (
        <Option value={symbol} style={{height: 50}}>
          <img className="dropdown-icon" src={`/images/${symbol.toLowerCase()}.svg`} />
          {symbol}
        </Option>
      ))}
    </Select>
  );
}

export default Dropdown;
