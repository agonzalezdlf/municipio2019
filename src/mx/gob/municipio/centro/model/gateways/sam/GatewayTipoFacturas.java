package mx.gob.municipio.centro.model.gateways.sam;

import java.util.List;
import java.util.Map;

import mx.gob.municipio.centro.model.bases.BaseGateway;

public class GatewayTipoFacturas extends BaseGateway{

	public GatewayTipoFacturas(){
		
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getTipoFacturas(){		
		  return this.getJdbcTemplate().queryForList("SELECT *  FROM SAM_CAT_TIPO_FACTURAS");		
		}
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getTipoFacturasEstatusActivos(){		
		  return this.getJdbcTemplate().queryForList("SELECT * FROM  SAM_CAT_TIPO_FACTURAS WHERE STATUS=1");		
		}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getTipoDocumentosUsuario(Integer idUsuario ){
    	return this.getJdbcTemplate().queryForList("SELECT * FROM SAM_CAT_TIPO_FACTURAS CTF WHERE CTF.STATUS=1 AND CTF.Id_TipoFactura IN ( SELECT  B.ID_TIPO_FAC  FROM SAM_GRUPO_CONFIG_USUARIO a INNER JOIN SAM_GRUPO_TIPO_FAC b ON a.ID_GRUPO_CONFIG = b.ID_GRUPO_CONFIG where a.ID_USUARIO = ? )  ", new Object []{idUsuario});	
    } 
	
}
