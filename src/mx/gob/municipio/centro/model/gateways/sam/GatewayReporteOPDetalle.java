package mx.gob.municipio.centro.model.gateways.sam;
/*
  	Retorna al Controlador ControladorReporteNominasProyectos el listado de ordenes de pago por detalle a nivel partida	en el modulo de reportes. 
 */
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import mx.gob.municipio.centro.model.bases.BaseGateway;
import mx.gob.municipio.centro.model.gateways.sam.catalogos.GatewayMeses;

public class GatewayReporteOPDetalle extends BaseGateway{

private static Logger log = Logger.getLogger(GatewayReporteOPDetalle.class.getName());
	
	@Autowired
	public GatewayProyectoPartidas gatewayProyectoPartidas;
	
	@Autowired
	private GatewayMeses gatewayMeses;
	
	public GatewayReporteOPDetalle() {
		// TODO Auto-generated method stub
	}
	
	
	public List getretencion(Long idOrden) {
		List lista1 = this.getJdbcTemplate().queryForList("SELECT SUM(MR.IMPORTE)RENTENCION FROM MOV_RETENC MR WHERE CVE_OP = ?", new Object[]{idOrden});
		return lista1;	 
		
	}
	
public List<Map<String, Object>> getreparametros(Map<String, Object> modelo){
		
		Date fecha = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(fecha);
		int ejercicio = cal.get(Calendar.YEAR);
		int mesActual = gatewayMeses.getMesActivo(ejercicio);
		String cbostatus=modelo.get("cbostatus").toString();
		//int mesActual = gatewayMeses.getMesActivo(ejercicio);
		
		String sql = "SELECT OP.CVE_OP,OP.NUM_OP,MONTH(OPE.FECHA_EJER)MES_EJERCIDO,OP.NOTA,OP.ID_RECURSO,RECURSO,MOP.ID_PROYECTO,VP.DECRIPCION,P.CLV_CAPITU,MOP.CLV_PARTID,P.PARTIDA,MOP.MONTO " +
					 "FROM SAM_MOV_OP MOP "+
					 "INNER JOIN SAM_ORD_PAGO OP ON OP.CVE_OP=MOP.CVE_OP "+
					 "LEFT JOIN ORDENDPAGO OPE ON OPE.ID_OP=OP.CVE_OP "+ 
					 "INNER JOIN VPROYECTO VP ON VP.ID_PROYECTO=MOP.ID_PROYECTO "+
					 "INNER JOIN CAT_PARTID P ON P.CLV_PARTID=MOP.CLV_PARTID "+
					 "WHERE OP.STATUS IN ("+cbostatus+")";
		
		if(modelo.get("mes_OP")!= null)
				if(!modelo.get("mes_OP").toString().equals("") && !modelo.get("mes_OP").toString().equals("0"))	
			sql += " AND MONTH(OPE.FECHA_EJER) = :mes_OP ";
		
		if(!modelo.get("idtipogasto").toString().equals("0"))
			sql += " AND VP.ID_RECURSO = :idtipogasto ";
		
		if(modelo.get("idUnidad")!=null)
			if(!modelo.get("idUnidad").toString().equals("0"))
				sql += " AND VP.ID_DEPENDENCIA = :idUnidad ";
		
		/*if(modelo.get("idproyecto")!=null)
			if(!modelo.get("idproyecto").toString().equals(""))
				sql += " AND VP.ID_PROYECTO = :idproyecto ";*/
		
		if(modelo.get("idcapitulo")!= null)
			if(!modelo.get("idcapitulo").toString().equals("") && !modelo.get("idcapitulo").toString().equals("0"))
				sql += " AND P.CLV_CAPITU = :idcapitulo ";
		
		/*if(modelo.get("idpartida")!=null)
			if(!modelo.get("idpartida").equals("") && !modelo.get("idpartida").equals("0"))
				sql += " AND MOP.CLV_PARTID = :idpartida ";*/
		
		sql += " ORDER BY OP.CVE_OP";
		
		return this.getNamedJdbcTemplate().queryForList(sql, modelo);
		
	}
}
