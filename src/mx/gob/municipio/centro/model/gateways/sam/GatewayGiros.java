package mx.gob.municipio.centro.model.gateways.sam;

import java.util.List;
import java.util.Map;

import mx.gob.municipio.centro.model.bases.BaseGateway;

public class GatewayGiros extends BaseGateway {

	public GatewayGiros(){
		
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getGiros(){
		
		return this.getJdbcTemplate().queryForList("SELECT DESCRIPCION FROM SAM_CAT_GIROS");
	}
}
