package mx.gob.municipio.centro.model.gateways.sam;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;

import mx.gob.municipio.centro.model.bases.BaseGateway;
import mx.gob.municipio.centro.model.gateways.sam.catalogos.GatewayMeses;

public class GatewayReporteNominaValida extends BaseGateway{

	private static Logger log = Logger.getLogger(GatewayReporteNominaValida.class.getName());
	
	public GatewayReporteNominaValida() {
		// TODO Auto-generated method stub
	}
	
	public List<Map> getreparametros(Map modelo){
		
		Date fecha = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(fecha);
		
		
		
		String sql ="SELECT  N.TIPO_NOMINA, "+
								"VP.ID_RECURSO, "+
								"VP.CLV_UNIADM, "+
								"VP.UNIDADADM, "+
								"N.ID_PROYECTO,  "+
								"VP.N_PROGRAMA,  "+
								"VP.ACT_INST, "+ 
								"N.CLV_PARTID, "+
								"CP.PARTIDA, "+
								"SUM(N.IMPORTE) AS IMPORTE, "+
								"dbo.getDisponible(N.MES, N.ID_PROYECTO, N.CLV_PARTID) AS DISPONIBLE_MES, "+
								"dbo.getDisponibleAlPeriodo(1,12, N.ID_PROYECTO, N.CLV_PARTID) AS DISPONIBLE_ANIO, 0 AS TOTAL "+
						"FROM SAM_NOMINA AS N  "+
								"INNER JOIN VPROYECTO AS VP ON (VP.ID_PROYECTO = N.ID_PROYECTO)  "+
								"INNER JOIN CAT_PARTID AS CP ON (CP.CLV_PARTID = N.CLV_PARTID) "+ 
						"GROUP BY N.TIPO_NOMINA, VP.ID_RECURSO, VP.CLV_UNIADM, VP.UNIDADADM, N.ID_PROYECTO, VP.N_PROGRAMA, VP.ACT_INST, N.CLV_PARTID, CP.PARTIDA, N.MES  "+
						"ORDER BY N.TIPO_NOMINA, VP.ID_RECURSO, VP.UNIDADADM, VP.CLV_UNIADM ASC";
		
		log.info("Se genero la lista");
		return this.getNamedJdbcTemplate().queryForList(sql, modelo);
		
	}
}
