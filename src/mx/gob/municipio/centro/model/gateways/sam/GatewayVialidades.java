package mx.gob.municipio.centro.model.gateways.sam;

import java.util.List;
import java.util.Map;

import mx.gob.municipio.centro.model.bases.BaseGateway;

public class GatewayVialidades extends BaseGateway  {

	public GatewayVialidades(){
		
	}
	public List<Map<String, Object>>getVialidades(){
		String sql="SELECT ID_VIALIDAD, VIALIDAD FROM SAM_CAT_VIALIDAD";
		return this.getJdbcTemplate().queryForList(sql);
		
	}
}
