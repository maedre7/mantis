import { Slider, InputNumber, Row, Col } from 'antd';

const SliderView = (props) => {
  const {maxLtv} = props;
  const defaultValue = maxLtv < 0.50 ? maxLtv : 0.50;
  return (
    <Row>
      <Col span={12}>
        <Slider
          min={0}
          max={maxLtv}
          onChange={(val) => props.onChange('ltv', val)}
          value={props.value}  // typeof inputValue === 'number' ? inputValue : 0
          step={0.01}
          trackStyle={{ backgroundColor: '#40C4A6' }}
          handleStyle={{ borderColor: '#40C4A6' }}
          defaultValue={defaultValue}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={props.maxLtv}
          style={{ margin: '0 16px' }}
          step={0.01}
          value={props.value}
          onChange={(val) => props.onChange('ltv', val)}
        />
      </Col>
    </Row>
  );
}

export default SliderView;