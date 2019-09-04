package mx.gob.municipio.centro.model.gateways.sam;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;

import mx.gob.municipio.centro.model.bases.BaseGateway;
import mx.gob.municipio.centro.model.gateways.sam.catalogos.GatewayMeses;
import mx.gob.municipio.centro.view.controller.sam.facturas.ListaNomina;

public class GatewayReporteNominaValida extends BaseGateway {

	private static Logger log = Logger.getLogger(GatewayReporteNominaValida.class.getName());

	public GatewayReporteNominaValida() {
		// TODO Auto-generated method stub
	}

	public Map<String, Object> cargarInformacion(Map modelo)
	{
		long startTime = System.nanoTime();

		List<Map> nomina = this.getJdbcTemplate().queryForList("SELECT N.ID_PROYECTO,N.CLV_PARTID,N.ID_RECURSO,N.ID_DEPENDENCIA,N.TIPO_NOMINA,N.NUM_QUINCENA,N.MES,CONVERT(varchar(10), N.FECHA_NOMINA, 103) AS FECHA_NOMINA,N.IMPORTE,N.NOTA, VP.CLV_UNIADM FROM SAM_NOMINA AS N INNER JOIN VPROYECTO AS VP ON (VP.ID_PROYECTO = N.ID_PROYECTO)");
		modelo.put("listadoNomina", nomina);
		
		List<Map> deduccicones = this.getJdbcTemplate().queryForList("SELECT D.*, CR.RETENCION FROM SAM_NOMINA_DEDUCCIONES AS D LEFT JOIN CAT_RETENC AS CR ON (CR.CLV_RETENC = D.CLV_RETENC)");
		modelo.put("listadodeducciones", deduccicones);
		
		List<ListaNomina> lista = new ArrayList<ListaNomina>();
		/*List<Map> validacionNomina = this.getJdbcTemplate().queryForList("SELECT  N.TIPO_NOMINA, "+
																					"VP.ID_RECURSO, "+
																					"VP.CLV_UNIADM, "+
																					"VP.UNIDADADM, "+
																					"N.ID_PROYECTO,  "+
																					"VP.N_PROGRAMA,  "+
																					"VP.ACT_INST, "+ 
																					"N.CLV_PARTID, "+
																					"CP.PARTIDA, "+
																					"SUM(N.IMPORTE) AS IMPORTE, "+
																					"dbo.getDisponible(N.MES, N.ID_PROYECTO, N.CLV_PARTID) AS DISPONIBLE_MES, 0 AS TOTAL "+
																			"FROM SAM_NOMINA AS N  "+
																					"INNER JOIN VPROYECTO AS VP ON (VP.ID_PROYECTO = N.ID_PROYECTO)  "+
																					"INNER JOIN CAT_PARTID AS CP ON (CP.CLV_PARTID = N.CLV_PARTID) "+ 
																			"GROUP BY N.TIPO_NOMINA, VP.ID_RECURSO, VP.CLV_UNIADM, VP.UNIDADADM, N.ID_PROYECTO, VP.N_PROGRAMA, VP.ACT_INST, N.CLV_PARTID, CP.PARTIDA, N.MES  "+
																			"ORDER BY N.TIPO_NOMINA, VP.ID_RECURSO, VP.UNIDADADM, VP.CLV_UNIADM ASC");*/
		int mes = getJdbcTemplate().queryForInt("SELECT MAX (MES) FROM SAM_NOMINA");
		
		List<Map> validacionNomina = this.getJdbcTemplate().queryForList("SELECT  N.TIPO_NOMINA, "+
																					"VP.ID_RECURSO, "+
																					"VP.CLV_UNIADM, "+
																					"VP.UNIDADADM, "+
																					"N.ID_PROYECTO,  "+
																					"VP.N_PROGRAMA,  "+
																					"VP.ACT_INST, "+ 
																					"N.CLV_PARTID, "+
																					"CP.PARTIDA, "+
																					"SUM(N.IMPORTE) AS IMPORTE, "+
																					//"dbo.getDisponible(N.MES, N.ID_PROYECTO, N.CLV_PARTID) AS DISPONIBLE_MES, 0 AS TOTAL "+
																					"ISNULL( " +
																					"( CASE " + 
																							" WHEN N.MES = 1 THEN SP.ENEPRECOM " + 
																							" WHEN N.MES = 2 THEN SP.FEBPRECOM " + 
																							" WHEN N.MES = 3 THEN SP.MARPRECOM " +  
																							" WHEN N.MES = 4 THEN SP.ABRPRECOM " + 
																							" WHEN N.MES = 5 THEN SP.MAYPRECOM " + 
																							" WHEN N.MES = 6 THEN SP.JUNPRECOM " + 
																							" WHEN N.MES = 7 THEN SP.JULPRECOM " + 
																							" WHEN N.MES = 8 THEN SP.AGOPRECOM " + 
																							" WHEN N.MES = 9 THEN SP.SEPPRECOM " + 
																							" WHEN N.MES = 10 THEN SP.OCTPRECOM " + 
																							" WHEN N.MES = 11 THEN SP.NOVPRECOM " + 
																							" WHEN N.MES = 12 THEN SP.DICPRECOM " + 
																							" END " + 
																						" ),0.00 " + 
																					" )DISPONIBLE_MES, 0 as total " +
																			" FROM SAM_NOMINA AS N  "+
																					" INNER JOIN VPROYECTO AS VP ON (VP.ID_PROYECTO = N.ID_PROYECTO)  "+
																					" INNER JOIN VPRES_COMPROMETIDO_GC AS SP ON (SP.ID_PROYECTO = N.ID_PROYECTO AND SP.CLV_PARTID=N.CLV_PARTID) AND MES= ? "+
																					" INNER JOIN CAT_PARTID AS CP ON (CP.CLV_PARTID = N.CLV_PARTID) "+ 
																			" GROUP BY N.TIPO_NOMINA, VP.ID_RECURSO, VP.CLV_UNIADM, VP.UNIDADADM, N.ID_PROYECTO, VP.N_PROGRAMA, VP.ACT_INST, N.CLV_PARTID, CP.PARTIDA, N.MES ,SP.JUNPRECOM,SP.ENEPRECOM,SP.FEBPRECOM,SP.MARPRECOM,SP.ABRPRECOM " +
																			" ,SP.MAYPRECOM,SP.JUNPRECOM,SP.JULPRECOM,SP.AGOPRECOM,SP.SEPPRECOM,SP.OCTPRECOM,SP.NOVPRECOM,SP.DICPRECOM "+
																			" ORDER BY N.TIPO_NOMINA, VP.ID_RECURSO, VP.UNIDADADM, VP.CLV_UNIADM ASC ",new Object[]{mes});
		//Realizar aqui el proceso para recuperar el proyecto y partida
		for(Map row: validacionNomina)
		{	
			if( lista.indexOf( new ListaNomina( (Integer) row.get("ID_PROYECTO"), row.get("CLV_PARTID").toString(), (BigDecimal) row.get("DISPONIBLE_MES") ) )==-1 )
			{
				lista.add( new ListaNomina( (Integer)row.get("ID_PROYECTO"), row.get("CLV_PARTID").toString(), (BigDecimal) row.get("DISPONIBLE_MES") ) );
			}
		}
		
		//Realizar el proceso para restar los montos
		for(Map row: validacionNomina)
		{
			for(ListaNomina reg : lista)
			{
				if(reg.ID_PROYECTO == Integer.parseInt(row.get("ID_PROYECTO").toString()) && reg.CLV_PARTID.equals(row.get("CLV_PARTID").toString()))
				{
					BigDecimal importe = (BigDecimal) row.get("IMPORTE");
					BigDecimal disponibleMES = reg.IMPORTE_MES.subtract(importe);
					//BigDecimal disponibleANIO = reg.IMPORTE_ANIO.subtract(importe);
					row.put("DISPONIBLE_MES", reg.IMPORTE_MES);
					reg.IMPORTE_MES = disponibleMES;
					row.put("TOTAL", disponibleMES);
				}
			}
			
		}
		long endTime = System.nanoTime();
		long timer = endTime-startTime;
		System.out.println("tiempo que recorrio: " +timer);
		modelo.put("timer", timer);
		modelo.put("listavalidacionNomina", validacionNomina);
		return modelo;
	}
}
