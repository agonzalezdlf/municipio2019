package mx.gob.municipio.centro.model.gateways.sam.catalogos;

import java.util.List;

import mx.gob.municipio.centro.model.bases.BaseGateway;

public class GruposTipoFacGateway extends BaseGateway{


	public GruposTipoFacGateway(){
	}
	
	public void inserta (Integer tipoOp,Integer grupo) {
		this.getJdbcTemplate().update("INSERT INTO SAM_GRUPO_TIPO_FAC (ID_GRUPO_CONFIG,ID_TIPO_FAC)" +
						"VALUES (?,?)", new Object[]{grupo,tipoOp});
	}
	
	public void eliminar(Integer grupo  ){
		this.getJdbcTemplate().update("delete from SAM_GRUPO_TIPO_FAC where ID_GRUPO_CONFIG= ? ", new Object[]{grupo});
	}
	
	public List getGrupoTipoFac(Integer  grupo) {
		return this.getJdbcTemplate().queryForList(" SELECT  GTR.ID_GRUPO_TIPO_FAC,  CTR.DESCRIPCION , CTR.ID_TIPOFACTURA " +
												   " FROM         SAM_CAT_TIPO_FACTURAS CTR " +
												   " LEFT OUTER JOIN   SAM_GRUPO_TIPO_FAC  GTR ON GTR.ID_TIPO_FAC=CTR.ID_TIPOFACTURA AND " + 
												   " GTR.ID_GRUPO_CONFIG =? WHERE CTR.STATUS='True' ", new Object[]{grupo});	  
		
	}
}
