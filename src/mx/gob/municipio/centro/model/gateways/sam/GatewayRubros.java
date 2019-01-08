package mx.gob.municipio.centro.model.gateways.sam;

import java.util.List;
import java.util.Map;

import mx.gob.municipio.centro.model.bases.BaseGateway;

public class GatewayRubros extends BaseGateway{

	public GatewayRubros(){
		
	}
	
	
public List<Map<String, Object>> getRubros(){
		
		return this.getJdbcTemplate().queryForList("SELECT DESCRIPCION FROM SAM_CAT_RUBROS");
	} 
}

