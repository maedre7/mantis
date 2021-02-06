import Select from "antd/lib/select";
import {TOKENS} from '../config/config';

const { Option } = Select;

const Dropdown = (props) => {

  const tokens = Object.keys(TOKENS);

  const onChange = (val) => {
    if(props.mode == '1'){
      props.onSelect('tokenIn', val);
    }
    else{
      props.onSelect('leverageToken', val);
    }
  }
  
  const defaultValue = props.mode == '1' ? "DAI" : "WETH";

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
