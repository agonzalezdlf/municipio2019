/**
 * @author Lsc. Mauricio Hernandez Leon.
 * @version 1.0
 *
 */
package mx.gob.municipio.centro.view.controller.sam.utilerias;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import mx.gob.municipio.centro.model.gateways.sam.catalogos.GatewayMeses;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/sam/utilerias/cambio_estatus_periodo.action")
public class ControladorCambioEstatusPeriodos extends ControladorBase {

	public ControladorCambioEstatusPeriodos(){		
	}
	
	@Autowired	
	public GatewayMeses gatewayMeses;
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = {RequestMethod.GET,RequestMethod.POST})    
	public String  requestGetControlador( Map modelo, HttpServletRequest request ) {
		
		String  acciones= request.getParameter("acciones");
		/*if ("guardar".equals(acciones)) {
			Integer idMes= request.getParameter("idMes")==null ? null: request.getParameter("idMes").equals("")? null: Integer.parseInt(request.getParameter("idMes"));
			String  estatus= request.getParameter("estatus");
			String  tipoEstatus= request.getParameter("tipoEstatus");
			estatus = estatus.equals("ACTIVO") ? "INACTIVO": "ACTIVO";
			if (tipoEstatus.equals("DOC"))
				gatewayMeses.actializarEstatusDoc(idMes,estatus);
			else
				gatewayMeses.actializarEstatusEva(idMes,estatus);
		}	*/	
		
		modelo.put("meses",getMeses());
		modelo.put("mesactivo",mesActivo());
		
	    return "sam/utilerias/cambio_estatus_periodo.jsp";
	}
		
	
    private List<Map> getMeses(){
    	
		return this.getJdbcTemplate().queryForList(" SELECT      MES, DESCRIPCION, ESTATUS, ESTATUSEVA, ID_MES , "+ 
				" CASE ESTATUS WHEN 'ACTIVO' THEN 'Cerrar'  ELSE 'Abrir' END AS ACCION, "+
				" CASE ESTATUSEVA WHEN 'ACTIVO' THEN 'Cerrar'  ELSE 'Abrir' END AS ACCIONEVA "+
				" FROM        MESES where ejercicio=? "+
				" ORDER BY MES ", new Object []{this.getSesion().getEjercicio()});    		
    }
	
    
	public int mesActivo(){
		return gatewayMeses.getMesActivo(this.getSesion().getEjercicio());
	}	
	
	public String cerrarPeriodo(final Integer idMes, final String estatus){
		try {    
            this.getTransactionTemplate().execute(new TransactionCallbackWithoutResult(){
                @Override
                protected void   doInTransactionWithoutResult(TransactionStatus status) {	    
                	
	                if(estatus.equals("ACTIVO")){
	                		int mesAct = mesActivo();
	                		int mes = mesAct + 1;
	                		
	                		//Migrar los Devengados en Facturas
	                		//migrarDevengado(mes, mesAct);
	                		
		                	//Migrar la seccion de Contratos
	                		//migrarContratos(mes, mesAct);
	                		
	                		//Migrar el saldo de las Requisiciones y Orden de Trabajo
		                	//migrarRequisiciones(mes, mesAct);
		                	
		                	//Migrar el saldo de los Pedidos
		                	migrarPedidos(mes, mesAct);
		                	
		                	//Migrar periodo del vale
		                	//migrarVale(mes, mesAct);
		                	
	            	}
                	//Cambiamos el periodo al siguiente mes
                	gatewayMeses.actializarEstatusDoc(idMes, estatus);
                } 
             });
            return "";
           
            } catch (DataAccessException e) {	            	
                 throw new RuntimeException(e.getMessage(),e);
            }
		
	}
	public void migrarVale (int mes, int mesAct){
		
		if(mes<=12)
		{
    		List<Map> vales = getJdbcTemplate().queryForList("SELECT cve_vale FROM SAM_VALES_EX WHERE CVE_VALE IN (SELECT CVE_DOC FROM VT_COMPROMISOS WHERE TIPO_DOC ='VAL' AND PERIODO = ?)", new Object[]{mesAct});
    		for(Map row: vales)
    		{
    			getJdbcTemplate().update("UPDATE SAM_VALES_EX SET MES =? WHERE CVE_VALE =?", new Object[]{mes, row.get("CVE_VALE")});
    		}
		}
		
		
	}
	
	
	public void migrarPedidos (int mes, int mesAct){
				
		
		String sql ="SELECT P.CVE_PED,P.STATUS,CP.PERIODO,SUM(CP.IMPORTE)COMPROMISO_MES,P.FECHA_CIERRE,P.FECHA_FINIQUITADO " +
				    " ,ISNULL((SELECT SUM(FD.IMPORTE) FROM SAM_FACTURA_DETALLE FD INNER JOIN SAM_FACTURAS F ON F.CVE_FACTURA=FD.CVE_FACTURA AND F.CVE_PED=CP.CVE_PED AND CP.PERIODO=MONTH(F.FECHA_CIERRE) WHERE  F.STATUS IN (1,3)),0.00) DEVENGADO_MES " +  
				    " ,SUM(CP.IMPORTE)-ISNULL((SELECT SUM(FD.IMPORTE) FROM SAM_FACTURA_DETALLE FD INNER JOIN SAM_FACTURAS F ON F.CVE_FACTURA=FD.CVE_FACTURA AND F.CVE_PED=CP.CVE_PED AND CP.PERIODO=MONTH(F.FECHA_CIERRE) WHERE  F.STATUS IN (1,3)),0.00) 'POR_DEVENGAR' " +
				    " FROM SAM_COMP_PEDIDO CP " +
				    " INNER JOIN SAM_PEDIDOS_EX P ON P.CVE_PED=CP.CVE_PED " +
				    " WHERE P.STATUS IN (1) AND FECHA_FINIQUITADO IS NULL AND CP.PERIODO=? " +
				    " GROUP BY P.CVE_PED,P.STATUS,P.FECHA_CIERRE,P.FECHA_FINIQUITADO,CP.CVE_PED,CP.PERIODO " +
				    " HAVING SUM(CP.IMPORTE)-ISNULL((SELECT SUM(FD.IMPORTE) FROM SAM_FACTURA_DETALLE FD INNER JOIN SAM_FACTURAS F ON F.CVE_FACTURA=FD.CVE_FACTURA AND F.CVE_PED=CP.CVE_PED AND CP.PERIODO=MONTH(F.FECHA_CIERRE) WHERE  F.STATUS IN (1,3)),0.00)>0";
		
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> Pedidos =getJdbcTemplate().queryForList(sql, new Object[]{mesAct});
		
		for(Map P: Pedidos)
		{ 
			Long CVE_PED = Long.parseLong( P.get("CVE_PED").toString());
			BigDecimal totalComprometidoMes = ((BigDecimal) P.get("COMPROMISO_MES"));//IMPORTE COMPROMETIDO DEL PERIODO
			BigDecimal totalOcupadoMes = ((BigDecimal) P.get("DEVENGADO_MES"));//IMPORTE COMPROBADO DEL PERIODO
			BigDecimal diferenciaMes = ((BigDecimal) P.get("POR_DEVENGAR"));//IMPORTE POR COMPROBAR DEL PERIODO CERRADO
			Integer Periodo = Integer.parseInt(P.get("PERIODO").toString());
			Integer PeriodoNew = Periodo+1;
			//La diferencia se enviara al siguiente mes
			
			
			
			//Respalda el importe comprometido originalmente por el documento..
			//this.getJdbcTemplate().update("UPDATE SAM_COMP_PEDIDO SET PERIODO_ANT = PERIODO, IMPORTE_ANT =IMPORTE, IMPORTE =0 WHERE CVE_PED =? AND PERIODO = ? AND TIPO_MOV =?", new Object[]{CVE_PED,mesAct, "COMPROMISO"});
			
			//int mesAct = mesActivo(); => Periodo Cerrando
			if (mesAct==Periodo)
				
				this.getJdbcTemplate().update("UPDATE SAM_COMP_PEDIDO SET PERIODO_ANT = PERIODO, IMPORTE_ANT =IMPORTE, IMPORTE =? WHERE CVE_PED =? AND PERIODO=?", new Object[]{totalOcupadoMes,CVE_PED,mesAct});
			
			//int mes = mesAct + 1;
			if (mes==PeriodoNew){
								
				BigDecimal Incremento = (BigDecimal) getJdbcTemplate().queryForObject("SELECT ISNULL(SUM(IMPORTE),0.00) FROM SAM_COMP_PEDIDO WHERE CVE_PED=? AND PERIODO=?", new Object[]{CVE_PED,PeriodoNew},BigDecimal.class);
								
				BigDecimal nuevo_compromiso = Incremento.add(diferenciaMes);
				
				this.getJdbcTemplate().update("UPDATE SAM_COMP_PEDIDO SET IMPORTE =? WHERE CVE_PED =? AND PERIODO=?", new Object[]{nuevo_compromiso,CVE_PED,mes});
				
			}else{
				
				BigDecimal Incremento = (BigDecimal) getJdbcTemplate().queryForObject("SELECT ISNULL(SUM(IMPORTE),0.00) FROM SAM_COMP_PEDIDO WHERE CVE_PED=? AND PERIODO=?", new Object[]{CVE_PED,PeriodoNew},BigDecimal.class);
				BigDecimal nuevo_compromiso = Incremento.add(diferenciaMes);
				this.getJdbcTemplate().update("INSERT INTO SAM_COMP_PEDIDO(CVE_PED, TIPO_MOV, IMPORTE, PERIODO) VALUES(?,?,?,?)", new Object[]{CVE_PED, "COMPROMISO", nuevo_compromiso, mesAct});
			}
			
		}
	}
	
	//CIERRE DE PERIODO PARA LAS REQUISICIONES.
	public void migrarRequisiciones(int mes, int mesAct)
	{
	
		List<Map> Requisiciones = getJdbcTemplate().queryForList("SELECT CR.CVE_REQ,R.TIPO,R.STATUS,SUM(CR.IMPORTE)COMPROMETIDO_MES,R.FECHA_CIERRE,R.FECHA_FINIQUITADO, " +
																 "( " +
																	" CASE " +    
																			" WHEN R.TIPO IN (1,7) THEN  ISNULL((SELECT SUM(P.TOTAL) FROM SAM_PEDIDOS_EX P WHERE P.STATUS IN (1,5) AND P.CVE_REQ=CR.CVE_REQ),0.00) " +
																			" WHEN R.TIPO NOT IN (1,7) THEN ISNULL((SELECT SUM(FD.IMPORTE) FROM SAM_FACTURA_DETALLE FD INNER JOIN SAM_FACTURAS F ON F.CVE_FACTURA=FD.CVE_FACTURA AND F.CVE_REQ=CR.CVE_REQ AND CR.PERIODO=MONTH(FECHA_CIERRE) WHERE  F.STATUS IN (1,3)),0.00) " +
																	"END " +
																	") OCUPADO_MES,SUM(CR.IMPORTE)-( " +
																			"CASE " +   
																			" WHEN R.TIPO IN (1,7) THEN  ISNULL((SELECT SUM(P.TOTAL) FROM SAM_PEDIDOS_EX P WHERE P.STATUS IN (1,5) AND P.CVE_REQ=CR.CVE_REQ),0.00) " +
																			" WHEN R.TIPO NOT IN (1,7) THEN ISNULL((SELECT SUM(FD.IMPORTE) FROM SAM_FACTURA_DETALLE FD INNER JOIN SAM_FACTURAS F ON F.CVE_FACTURA=FD.CVE_FACTURA AND F.CVE_REQ=CR.CVE_REQ AND CR.PERIODO=MONTH(FECHA_CIERRE) WHERE  F.STATUS IN (1,3)),0.00) " +
																			" END " +
																			" )DIFERENCIA_MES " +

																			" FROM SAM_COMP_REQUISIC CR " +
																			" INNER JOIN SAM_REQUISIC R ON R.CVE_REQ=CR.CVE_REQ " +
																			" WHERE CVE_PED IS NULL AND R.STATUS NOT IN (4) AND CR.PERIODO=? " +
																			" GROUP BY CR.CVE_REQ,R.TIPO,R.STATUS,CR.PERIODO,R.FECHA_CIERRE,R.FECHA_CANCELADO,R.FECHA_FINIQUITADO HAVING SUM(CR.IMPORTE)>0", new Object[]{mesAct});
		
		for(Map c: Requisiciones)
		{
			Long cve_req = Long.parseLong( c.get("CVE_REQ").toString());
			BigDecimal totalComprometidoMes = ((BigDecimal) c.get("COMPROMETIDO_MES"));//IMPORTE COMPROMETIDO DEL PERIODO
			BigDecimal totalOcupadoMes = ((BigDecimal) c.get("OCUPADO_MES"));//IMPORTE COMPROBADO DEL PERIODO
			BigDecimal diferenciaMes = ((BigDecimal) c.get("DIFERENCIA_MES"));//IMPORTE POR COMPROBAR DEL PERIODO CERRADO
			
			
			
			//Respalda el importe comprometido originalmente por el documento..
			this.getJdbcTemplate().update("UPDATE SAM_COMP_REQUISIC SET PERIODO_ANT = PERIODO, IMPORTE_ANT =IMPORTE, IMPORTE =0 WHERE CVE_REQ =? AND PERIODO = ? AND TIPO =?", new Object[]{cve_req,mesAct, "COMPROMISO"});
			
			
			//TOTALIZAR EN EL PERIODO NUEVO EL IMPORTE DEL PERIODO MAS EL IMPORTE NO COMPROBADO DEL MES ANTERIOR
			BigDecimal compro_next = (BigDecimal) getJdbcTemplate().queryForObject("SELECT ISNULL(SUM(IMPORTE),0.00) FROM SAM_COMP_REQUISIC WHERE CVE_PED IS NULL AND CVE_REQ=? AND PERIODO=?", new Object[]{cve_req,mes},BigDecimal.class);
			
			//Integer periodo_siguiente = getJdbcTemplate().queryForInt("SELECT PERIODO FROM SAM_COMP_REQUISIC WHERE CVE_PED IS NULL AND CVE_REQ=? AND PERIODO=?", new Object[]{cve_req,mes});//Integer.class
			
			//La diferencia se enviara al siguiente mes
			BigDecimal nuevo_compromiso = compro_next.add(diferenciaMes);
			
			double dispone = nuevo_compromiso.doubleValue(); // The double you want			
			if (dispone>0.0)
			{
			//Inserta el total comprobado en el mes...
				this.getJdbcTemplate().update("UPDATE SAM_COMP_REQUISIC SET IMPORTE=? WHERE CVE_REQ=? AND PERIODO=? AND TIPO =?", new Object[]{totalOcupadoMes,cve_req,mesAct,"COMPROMISO"});
				//this.getJdbcTemplate().update("INSERT INTO SAM_COMP_REQUISIC(CVE_REQ, TIPO, IMPORTE, PERIODO) VALUES(?,?,?,?)", new Object[]{cve_req, "COMPROMISO", totalOcupadoMes, mesAct});
			
			//Inserta la diferencia en el siguiente mes
				this.getJdbcTemplate().update("INSERT INTO SAM_COMP_REQUISIC(CVE_REQ, TIPO, IMPORTE, PERIODO) VALUES(?,?,?,?)", new Object[]{cve_req, "COMPROMISO", diferenciaMes, mes});
			}
			System.out.println(dispone);
		}
	}
	
	public void migrarContratos(int mes, int mesAct)
	{
		java.util.Date fecha = new Date();
    	List<Map> Contratos = getJdbcTemplate().queryForList("SELECT SUM(IMPORTE) AS COMPROMETIDO_MES, PERIODO, ID_PROYECTO, CLV_PARTID, CVE_CONTRATO FROM SAM_COMP_CONTRATO " + 
    														 "WHERE PERIODO =? GROUP BY CVE_CONTRATO, PERIODO, ID_PROYECTO, CLV_PARTID " + 
    														 "HAVING SUM(IMPORTE)>0 ", new Object[]{mesAct});
    	for(Map c: Contratos)
    	{
    		//El totalComprometido quedara solo comprmetiendo en el mes actual
    		BigDecimal totalComprometido = ((BigDecimal) c.get("COMPROMETIDO_MES")) ;
    		//importeTotalMes Es toda la comprobacion de documentos que restan al totalComprometido
    		BigDecimal importeTotalMes = (BigDecimal) getJdbcTemplate().queryForObject("SELECT ISNULL(SUM(FD.IMPORTE),0.0) FROM SAM_FACTURA_DETALLE FD " +
    																				   "INNER JOIN SAM_FACTURAS F ON F.CVE_FACTURA=FD.CVE_FACTURA " +
    																				   " WHERE STATUS IN (1,3) AND MONTH(F.FECHA_CIERRE)=? AND F.CVE_CONTRATO =?  AND FD.ID_PROYECTO =? AND FD.CLV_PARTID=?", new Object[]{mesAct, c.get("CVE_CONTRATO"), c.get("ID_PROYECTO"), c.get("CLV_PARTID")}, BigDecimal.class);
    		
    		
    		//La diferencia se enviara al siguiente mes
    		BigDecimal diferencia = totalComprometido.subtract(importeTotalMes); 
    		
    		//Se reinician los importes que comprometen a Cero para generer uno por el total que compromete el periodo
    		getJdbcTemplate().update("UPDATE SAM_COMP_CONTRATO SET IMPORTE = ? WHERE CVE_CONTRATO = ? AND PERIODO = ? AND ID_PROYECTO =? AND CLV_PARTID =?", new Object[]{0, c.get("CVE_CONTRATO"), mesAct, c.get("ID_PROYECTO"), c.get("CLV_PARTID")});
    		
    		//Se inserta el totalComprometido que quedara en el mes actual antes de cerrar
    		getJdbcTemplate().update("INSERT INTO SAM_COMP_CONTRATO(CVE_CONTRATO, TIPO_MOV, ID_PROYECTO, CLV_PARTID, PERIODO, IMPORTE) VALUES (?,?,?,?,?,?)", new Object[]{c.get("CVE_CONTRATO"), "COMPROMISO", c.get("ID_PROYECTO"), c.get("CLV_PARTID"), mesAct, importeTotalMes});
    		
    		//Se inserta un nuevo registro de compromiso con la diferencia al siguiente mes
    		getJdbcTemplate().update("INSERT INTO SAM_COMP_CONTRATO(CVE_CONTRATO, TIPO_MOV, ID_PROYECTO, CLV_PARTID, PERIODO, IMPORTE) VALUES (?,?,?,?,?,?)", new Object[]{c.get("CVE_CONTRATO"), "COMPROMISO", c.get("ID_PROYECTO"), c.get("CLV_PARTID"), (mesAct+1), diferencia});
    		
    		
    		//FINIQUITAMOS LOS CONTRATOS QUE ESTAN TOTALMENTE DEVENGADOS...
    		BigDecimal por_devegar = (BigDecimal) getJdbcTemplate().queryForObject("SELECT [dbo].[getDevengadoXDocto] (44,?,?,?)",new Object[]{c.get("CVE_CONTRATO"), c.get("ID_PROYECTO"), c.get("CLV_PARTID")}, BigDecimal.class);
    		/*
    		if (por_devegar.equals(0))
    			
    			getJdbcTemplate().update("UPDATE SAM_CONTRATOS SET FECHA_FINIQUITADO=? WHERE CVE_CONTRATO?",new Object[]{fecha, c.get("CVE_CONTRATO")});
    			*/
    	}
    	

	}
	
	public void migrarDevengado(int mes, int mesAct)
	{
		if(mes<=12)
		{
    		List<Map> facturas = getJdbcTemplate().queryForList("SELECT CVE_FACTURA FROM SAM_FACTURAS WHERE CVE_FACTURA IN (SELECT CVE_DOC FROM VT_COMPROMISOS WHERE TIPO_DOC ='FAC' AND PERIODO = ?)", new Object[]{mesAct});
    		for(Map row: facturas)
    		{
    			getJdbcTemplate().update("UPDATE SAM_FACTURAS SET PERIODO =? WHERE CVE_FACTURA =?", new Object[]{mes, row.get("CVE_FACTURA")});
    			
    			//VALIDAR DOCUMENTOS PARA FINIQUITAR EN EL CIERRE SI FUERON COMPROBADOS EN SU TOTALIDAD
    		}
		}
	}
	//ejecuta actualizar estatus eva....para el proceso de cierre
	public String cerrarEval(final Integer idMes, final String estatus){
		try {    
            this.getTransactionTemplate().execute(new TransactionCallbackWithoutResult(){
                @Override
                protected void   doInTransactionWithoutResult(TransactionStatus status) {	    
                	gatewayMeses.actializarEstatusEva(idMes, estatus);
                } 
             });
            return "";
           
            } catch (DataAccessException e) {	            	
                 throw new RuntimeException(e.getMessage(),e);
            }
		
	}
}
