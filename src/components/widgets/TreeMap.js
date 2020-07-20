import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { ThemeContext } from "../context/ThemeContext";

const data = [
          
          {
            name: 'data',
            children: [
              { name: 'Data', size: 20544 },
              { name: 'DataList', size: 20000 },
              { name: 'DataSprite', size: 15349 },
              { name: 'NodeSprite', size: 19382 },
        ]
        }
        ];

const CustomTooltip = ({ active, payload, label }) => {
	if (active) {
		return (
			<div className="custom-tooltip">
				<p className="label">{`${payload[0].value}`}</p>
			</div>
		);
	}

	return null;
};

let renderLabel = (entry) => {
    return entry.name;
}

class TreeMap extends React.Component {
static contextType = ThemeContext;


//need to fix the name showing up
  render() {
    const { theme, dispatch } = this.context;
    const { primary, secondary } = theme;
    return (
        <ResponsiveContainer width="100%" height="90%">
      <Treemap
        width={400}
        height={200}
        data={this.props.data || data}
        name={renderLabel || "name"}
        nameKey={renderLabel || "name"}
        dataKey={this.props.x ||  "size"}
        ratio={4 / 3}
        stroke="#000"
        fill={secondary || primary}>
        <Tooltip content={<CustomTooltip/>}/>
        </Treemap>
      </ResponsiveContainer>
    );
  }
}

export default TreeMap;