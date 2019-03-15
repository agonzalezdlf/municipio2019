/**
 * @author Lsc. Mauricio Hernandez Leon.
 * @version 1.0
 *
 */
package mx.gob.municipio.centro.model.gateways.sam.catalogos;


import java.util.List;

import mx.gob.municipio.centro.model.bases.BaseGateway;

public class GatewayGruposPartidas extends BaseGateway {

	public GatewayGruposPartidas(){
	}

	public void inserta( String partida,Integer grupo ){		
		this.getJdbcTemplate().update("insert into SAM_GRUPO_PARTIDAS (ID_GRUPO_CONFIG,CLV_PARTID ) " +
				"VALUES (?,?)", new Object[]{grupo,partida});
	}

	public void eliminar(Integer grupo , Integer capitulo ){
		this.getJdbcTemplate().update("delete from SAM_GRUPO_PARTIDAS where ID_GRUPO_CONFIG= ?  and CLV_PARTID in ( select CLV_PARTID from CAT_PARTID where CLV_CAPITU = ?   )  ", new Object[]{grupo,capitulo});
	}	
	
	public List getGrupoPartidas(Integer  grupo,Integer capitulo) {	   
		   return this.getJdbcTemplate().queryForList("SELECT DISTINCT SGPAR.ID_PARTIDAS_GRUPO, CPAR.CLV_PARTID, CPAR.PARTIDA " +
				   	  " FROM         CAT_PARTID CPAR " +
				   	  " LEFT OUTER JOIN " +
                      " SAM_GRUPO_PARTIDAS SGPAR ON SGPAR.CLV_PARTID = CPAR.CLV_PARTID AND " + 
                      " SGPAR.ID_GRUPO_CONFIG = ? " +
                      " WHERE     (CPAR.CLV_CAPITU = ?)  ORDER BY CPAR.CLV_PARTID ASC", new Object[]{grupo,capitulo});
	}
	
}
