import {Menu, Dropdown, Button} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {TOKEN_LIST} from '../config/config';

const DropdownView = (props) => {

  const onClick = (e) => {
    if(props.mode == '1'){
      props.onSelect('tokenIn', TOKEN_LIST[e.key])
    }
    else{
      props.onSelect('leverageToken', TOKEN_LIST[e.key])
    }
  }

  const menu = (
    <Menu onClick={(e) => onClick(e)}>
      {
        TOKEN_LIST.map((token, index) => (
          <Menu.Item key={index} icon={<img className="dropdown-icon" src={`/images/${token.toLowerCase()}.svg`} />}>
            {token}
          </Menu.Item>
        ))
      }
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button>Button <DownOutlined /></Button>
    </Dropdown>
  );
}

export default DropdownView;
