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
	                		
	                		//Migrar periodo del vale
		                	migrarVale(mes, mesAct);
		                	
	                		//Migrar los Devengados en Facturas
	                		migrarDevengado(mes, mesAct);
	                		
		                	//Migrar la seccion de Contratos
	                		migrarContratos(mes, mesAct);
	                		
	                		//Migrar el saldo de las Requisiciones y Orden de Trabajo
		                	migrarRequisiciones(mes, mesAct);
		                	
		                	//Migrar el saldo de los Pedidos
		                	migrarPedidos(mes, mesAct);
		                	
		                	
		                	
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
		List<Map<String, Object> > Requisiciones = getJdbcTemplate().queryForList("SELECT SUM(A.IMPORTE) AS COMPROMETIDO_MES, " +
				"A.PERIODO,  " +
				"B.ID_PROYECTO,  " +
				"B.CLV_PARTID,  " +
				"A.CVE_REQ,  " +
				"B.TIPO, " +
				"C.TIPO_DOC, " +
				"C.MONTO AS OCUPADO_MES, " +
				"(SUM(A.IMPORTE) - C.MONTO) AS DIFERENCIA_MES " +
		"FROM SAM_COMP_REQUISIC AS A  " +
		"	INNER JOIN SAM_REQUISIC AS B ON (B.CVE_REQ = A.CVE_REQ) " +
		"	LEFT JOIN VT_COMPROMISOS AS C ON (C.CVE_DOC = A.CVE_REQ AND C.ID_PROYECTO = B.ID_PROYECTO AND C.CLV_PARTID = B.CLV_PARTID AND C.PERIODO = A.PERIODO) " +
		"WHERE A.PERIODO = ?  " +
		"	GROUP BY A.CVE_REQ, B.TIPO, C.TIPO_DOC, A.PERIODO, B.ID_PROYECTO, B.CLV_PARTID, C.MONTO " +
		"	HAVING (SUM(A.IMPORTE))>0 AND C.MONTO >0  " +
		"	AND (SUM(A.IMPORTE) - C.MONTO)>0", new Object[]{mesAct});
		for(Map c: Requisiciones)
		{
			Long cve_req = Long.parseLong( c.get("CVE_REQ").toString());
			BigDecimal totalComprometidoMes = ((BigDecimal) c.get("COMPROMETIDO_MES"));
			BigDecimal totalOcupadoMes = ((BigDecimal) c.get("OCUPADO_MES"));
			BigDecimal diferenciaMes = ((BigDecimal) c.get("DIFERENCIA_MES"));
			
			//Deshabilita los importe anteriores
			this.getJdbcTemplate().update("UPDATE SAM_COMP_REQUISIC SET PERIODO_ANT = PERIODO, IMPORTE_ANT =IMPORTE, IMPORTE =0 WHERE CVE_REQ =? AND PERIODO = ? AND TIPO =?", new Object[]{cve_req,mesAct, "COMPROMISO"});
			//Inserta el total ocupado en el mes actual
			this.getJdbcTemplate().update("INSERT INTO SAM_COMP_REQUISIC(CVE_REQ, TIPO, IMPORTE, PERIODO) VALUES(?,?,?,?)", new Object[]{cve_req, "COMPROMISO", totalOcupadoMes, mesAct});
			//Inserta la diferencia en el siguiente mes
			this.getJdbcTemplate().update("INSERT INTO SAM_COMP_REQUISIC(CVE_REQ, TIPO, IMPORTE, PERIODO) VALUES(?,?,?,?)", new Object[]{cve_req, "COMPROMISO", diferenciaMes, mes});
		}
	}
	
	public void migrarContratos(int mes, int mesAct)
	{
		java.util.Date fecha = new Date();
		int next_periodo =0;
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
    		
    		next_periodo = (int) getJdbcTemplate().queryForObject("SELECT MAX(PERIODO) FROM SAM_COMP_CONTRATO WHERE CVE_CONTRATO = ? ", new Object[]{c.get("CVE_CONTRATO")},Integer.class);
    		
    		
    		if (mesAct+1 <= next_periodo){
    			
    			//Se reinician los importes que comprometen a Cero para generer uno por el total que compromete el periodo
        		getJdbcTemplate().update("UPDATE SAM_COMP_CONTRATO SET IMPORTE = ? WHERE CVE_CONTRATO = ? AND PERIODO = ? AND ID_PROYECTO =? AND CLV_PARTID =?", new Object[]{importeTotalMes, c.get("CVE_CONTRATO"), mesAct, c.get("ID_PROYECTO"), c.get("CLV_PARTID")});
        		
        		//Comprometido del periodo siguiente
        		BigDecimal importeMesSiguiente = (BigDecimal) getJdbcTemplate().queryForObject("SELECT SUM(IMPORTE)COMPROMETIDO_MES_SIGUIENTE FROM SAM_COMP_CONTRATO WHERE CVE_CONTRATO=? AND PERIODO=?  AND FD.ID_PROYECTO =? AND FD.CLV_PARTID=?", new Object[]{ c.get("CVE_CONTRATO"),mesAct+1, c.get("ID_PROYECTO"), c.get("CLV_PARTID")}, BigDecimal.class);
        		//Suma el compromiso del mes siguiente mas la diferencia entre el comprometido y el devengado del periodo que se esta cerrando...
        		BigDecimal Compromiso_modifi = importeMesSiguiente.add(diferencia);
        		getJdbcTemplate().update("UPDATE SAM_COMP_CONTRATO SET IMPORTE = ? WHERE CVE_CONTRATO = ? AND PERIODO = ? AND ID_PROYECTO =? AND CLV_PARTID =?", new Object[]{Compromiso_modifi, c.get("CVE_CONTRATO"), mesAct+1, c.get("ID_PROYECTO"), c.get("CLV_PARTID")});
        		
    		}else{
    			
    			//Se inserta un nuevo registro de compromiso con la diferencia al siguiente mes
        		getJdbcTemplate().update("INSERT INTO SAM_COMP_CONTRATO(CVE_CONTRATO, TIPO_MOV, ID_PROYECTO, CLV_PARTID, PERIODO, IMPORTE) VALUES (?,?,?,?,?,?)", new Object[]{c.get("CVE_CONTRATO"), "COMPROMISO", c.get("ID_PROYECTO"), c.get("CLV_PARTID"), (mesAct+1), diferencia});
        		
    		}
    		
    		
    		
    		
    	
    		
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
