/**
 * @author Lsc. Mauricio Hernandez Leon.
 * @version 1.0
 *
 */
package mx.gob.municipio.centro.view.controller.sam.utilerias;

import java.awt.PageAttributes.MediaType;
import java.io.Console;
import java.io.IOException;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import javax.ws.rs.Produces; 
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.gob.municipio.centro.model.gateways.sam.catalogos.GatewayMeses;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
@RequestMapping("/sam/utilerias/cambio_estatus_periodo.action")
public class ControladorCambioEstatusPeriodos extends ControladorBase{
	private static Logger log = Logger.getLogger(ControladorCambioEstatusPeriodos.class.getName());
	
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
	
	@RequestMapping(value="/json/search")
	@Produces("application/json")
	@ResponseBody
	public Map<String, Object> findAll(@RequestParam("term")String nombrePeriodo){
		Map<String, Object> map = new HashMap<String, Object>();
		
		List<Map<String, Object>> m = gatewayMeses.getTodosMesesEjercicioNombres(nombrePeriodo);
		for (int i=0; i < m.size(); i++){
			Map<String, Object> mes = m.get(i); 
			map.put("nombre " +mes, "");
		}
		System.out.println(map.toString());
		return map;
		
	}
	
	@RequestMapping(value="/check.action", method=(RequestMethod.GET))     
	@ResponseBody
	public String check(@RequestParam Integer id, HttpServletRequest request, HttpServletResponse response, Model model) {
		log.info("Entro al check");
	    boolean a = termino();
	    if (a == true) {
	        model.addAttribute("alreadySaved", true);
	        return "already saved";
	    } else {
	        return "error exist";
	    }
	}
	
	
	@RequestMapping(value="demo", method=(RequestMethod.GET))     
	public @ResponseBody String demo1(HttpServletRequest request, HttpServletResponse response) {
		log.info("Entro al demo1");
		return "Demo 1";
	}
	
	@RequestMapping(value="submit.action", method = (RequestMethod.GET))     
	public @ResponseBody String Submit(HttpServletRequest request, HttpServletResponse response,@RequestParam("name") String name)throws IOException {
		log.info("Entro al demo3"+name);
		return "Respuesta 1";
	}
	
	
	
    private List<Map<String, Object>> getMeses(){
    	
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
	public boolean termino(){
		return true;
		
	}
	public void migrarVale (int mes, int mesAct){
		
		if(mes<=12)
		{
    		List<Map<String, Object>> vales = getJdbcTemplate().queryForList("SELECT cve_vale FROM SAM_VALES_EX WHERE CVE_VALE IN (SELECT CVE_DOC FROM VT_COMPROMISOS WHERE TIPO_DOC ='VAL' AND PERIODO = ?)", new Object[]{mesAct});
    		for(Map row: vales)
    		{
    			getJdbcTemplate().update("UPDATE SAM_VALES_EX SET MES =? WHERE CVE_VALE =?", new Object[]{mes, row.get("CVE_VALE")});
    		}
		}
		
		
	}
	
	
	public void migrarPedidos (int mes, int mesAct){
				
		
		String sql ="SELECT P.CVE_PED,P.STATUS,CP.PERIODO, CP.ID_PROYECTO,CP.CLV_PARTID,SUM(CP.IMPORTE)COMPROMISO_MES,P.FECHA_CIERRE,P.FECHA_FINIQUITADO " +
				    " ,ISNULL((SELECT SUM(FD.IMPORTE) FROM SAM_FACTURA_DETALLE FD INNER JOIN SAM_FACTURAS F ON F.CVE_FACTURA=FD.CVE_FACTURA AND F.CVE_PED=CP.CVE_PED AND CP.PERIODO=MONTH(F.FECHA_CIERRE) WHERE  F.STATUS IN (1,3)),0.00) DEVENGADO_MES " +  
				    " ,SUM(CP.IMPORTE)-ISNULL((SELECT SUM(FD.IMPORTE) FROM SAM_FACTURA_DETALLE FD INNER JOIN SAM_FACTURAS F ON F.CVE_FACTURA=FD.CVE_FACTURA AND F.CVE_PED=CP.CVE_PED AND CP.PERIODO=MONTH(F.FECHA_CIERRE) WHERE  F.STATUS IN (1,3)),0.00) 'POR_DEVENGAR' " +
				    " FROM SAM_COMP_PEDIDO CP " +
				    " INNER JOIN SAM_PEDIDOS_EX P ON P.CVE_PED=CP.CVE_PED " +
				    " WHERE FECHA_FINIQUITADO IS NULL AND FECHA_CANCELADO IS NULL AND CP.PERIODO=? " +
				    " GROUP BY P.CVE_PED,P.STATUS,P.FECHA_CIERRE,P.FECHA_FINIQUITADO,CP.CVE_PED,CP.PERIODO,CP.ID_PROYECTO,CP.CLV_PARTID " +
				    " HAVING SUM(CP.IMPORTE)-ISNULL((SELECT SUM(FD.IMPORTE) FROM SAM_FACTURA_DETALLE FD INNER JOIN SAM_FACTURAS F ON F.CVE_FACTURA=FD.CVE_FACTURA AND F.CVE_PED=CP.CVE_PED AND CP.PERIODO=MONTH(F.FECHA_CIERRE) WHERE  F.STATUS IN (1,3)),0.00)>0";
		
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> Pedidos =getJdbcTemplate().queryForList(sql, new Object[]{mesAct});
		
		for(Map P: Pedidos)
		{ 
			/*mesAct==Periodo a cerrar*/
			/*mes==Nuevo periodo*/
					
			Long CVE_PED = Long.parseLong( P.get("CVE_PED").toString());
			BigDecimal compromisoPeriodo = ((BigDecimal) P.get("COMPROMISO_MES"));//IMPORTE COMPROMETIDO DEL PERIODO
			BigDecimal devengadoPeriodo = ((BigDecimal) P.get("DEVENGADO_MES"));//IMPORTE COMPROBADO DEL PERIODO
			BigDecimal porDevengarPeriodo = ((BigDecimal) P.get("POR_DEVENGAR"));//IMPORTE POR COMPROBAR DEL PERIODO CERRADO
			Integer Periodo = Integer.parseInt(P.get("PERIODO").toString());
			Integer PeriodoNew = Periodo+1;
						
			//Respalda el importe comprometido originalmente por el documento..
			this.getJdbcTemplate().update("UPDATE SAM_COMP_PEDIDO SET PERIODO_ANT = PERIODO, IMPORTE_ANT =?, IMPORTE=0 WHERE CVE_PED =? AND PERIODO=?", new Object[]{compromisoPeriodo, CVE_PED, mesAct});
			
			BigDecimal diferencia = compromisoPeriodo.subtract(devengadoPeriodo); 
			
			//int mes = mesAct + 1;
			if (mes <= Periodo){
								
				BigDecimal Incremento = (BigDecimal) getJdbcTemplate().queryForObject("SELECT ISNULL(SUM(IMPORTE),0.00) FROM SAM_COMP_PEDIDO WHERE CVE_PED=? AND PERIODO=?", new Object[]{CVE_PED,mes},BigDecimal.class);
				BigDecimal nuevo_compromiso = Incremento.add(porDevengarPeriodo);
				this.getJdbcTemplate().update("UPDATE SAM_COMP_PEDIDO SET IMPORTE =? WHERE CVE_PED =? AND PERIODO=?", new Object[]{nuevo_compromiso,CVE_PED,mes});
				
			}else{
				
				this.getJdbcTemplate().update("INSERT INTO SAM_COMP_PEDIDO(CVE_PED, TIPO_MOV, ID_PROYECTO, CLV_PARTID, IMPORTE, PERIODO) VALUES(?, ?, ?, ?, ?, ?)", new Object[]{CVE_PED, "COMPROMISO",P.get("ID_PROYECTO").toString(), P.get("CLV_PARTID").toString() ,diferencia, mes});
			}
			
		}
	}
	
	//CIERRE DE PERIODO PARA LAS REQUISICIONES.
	public void migrarRequisiciones(int mes, int mesAct)
	{
		int pdocto =0;
		
		getJdbcTemplate().update("UPDATE SAM_REQUISIC SET PERIODO = ? WHERE STATUS = 0 ", new Object[]{ mes });
		
		@SuppressWarnings("unchecked")
		List<Map<String, Object> > Requisiciones = getJdbcTemplate().queryForList("SELECT SUM(A.IMPORTE) AS COMPROMISO_MES, A.PERIODO, B.ID_PROYECTO,  " +
				" B.CLV_PARTID,  A.CVE_REQ,  B.TIPO, C.TIPO_DOC, ISNULL(C.MONTO,0.00) AS POR_COMPROBAR_MES, (SUM(A.IMPORTE) - C.MONTO) AS COMPROBADO_MES " +
				" FROM SAM_COMP_REQUISIC AS A  " +
				" INNER JOIN SAM_REQUISIC AS B ON (B.CVE_REQ = A.CVE_REQ) AND A.TIPO='COMPROMISO' " +
				" LEFT JOIN VT_COMPROMISOS AS C ON (C.CVE_DOC = A.CVE_REQ AND C.ID_PROYECTO = B.ID_PROYECTO AND C.CLV_PARTID = B.CLV_PARTID AND C.PERIODO = A.PERIODO) " +
				" WHERE A.PERIODO = ? " +
				" GROUP BY A.CVE_REQ, B.TIPO, C.TIPO_DOC, A.PERIODO, B.ID_PROYECTO, B.CLV_PARTID, C.MONTO " +
				" HAVING (SUM(A.IMPORTE))>0 AND C.MONTO >0  ", new Object[]{mesAct});
		for(Map<String, Object> c: Requisiciones)
		{
			Long cve_req = Long.parseLong( c.get("CVE_REQ").toString());
			
			pdocto = (int) getJdbcTemplate().queryForObject("SELECT ISNULL(MAX( CR.PERIODO ),0.00) FROM SAM_COMP_REQUISIC CR INNER JOIN SAM_REQUISIC R  ON CR.CVE_REQ=R.CVE_REQ WHERE CR.TIPO='COMPROMISO' AND R.FECHA_FINIQUITADO IS NULL AND CR.PERIODO= ? AND CR.CVE_REQ= ? ", new Object[]{mes, cve_req},Integer.class);
						
			BigDecimal compromiso = ((BigDecimal) c.get("COMPROMISO_MES"));
			BigDecimal por_comprobar = ((BigDecimal) c.get("POR_COMPROBAR_MES"));
			BigDecimal comprobado = ((BigDecimal) c.get("COMPROBADO_MES"));
			BigDecimal importback = (BigDecimal) getJdbcTemplate().queryForObject("SELECT ISNULL(SUM(IMPORTE_ANT),0.00)IMPORTE_ANT FROM SAM_COMP_REQUISIC WHERE CVE_REQ= ? AND PERIODO_ANT= ? " ,new Object[]{cve_req, mesAct}, BigDecimal.class);
			
			this.getJdbcTemplate().update("DELETE FROM SAM_COMP_REQUISIC WHERE CVE_REQ= ? AND PERIODO= ? AND TIPO='COMPROMISO' ", new Object[]{cve_req, mesAct});
			//Respalda los importe anteriores al momento del cierre
			//this.getJdbcTemplate().update("UPDATE SAM_COMP_REQUISIC SET PERIODO_ANT = PERIODO, IMPORTE_ANT =IMPORTE, IMPORTE =? WHERE CVE_REQ =? AND PERIODO = ? AND TIPO =?", new Object[]{comprobado, cve_req, mesAct, "COMPROMISO"});
			this.getJdbcTemplate().update("INSERT INTO SAM_COMP_REQUISIC(CVE_REQ, TIPO, IMPORTE, PERIODO, IMPORTE_ANT, PERIODO_ANT) VALUES(?,?,?,?,?,?)", new Object[]{cve_req, "COMPROMISO", comprobado, mesAct,importback,mesAct});
			//DELETE FROM SAM_COMP_REQUISIC WHERE CVE_REQ =29 AND PERIODO = 4
			if ((pdocto > 0) && (pdocto == mes) ){
				
				BigDecimal compromiso_PS =  (BigDecimal) getJdbcTemplate().queryForObject("SELECT IMPORTE FROM SAM_COMP_REQUISIC WHERE CVE_REQ =? AND PERIODO = ? AND TIPO='COMPROMISO'" ,new Object[]{cve_req, mes}, BigDecimal.class);
				BigDecimal actComprimiso_PS = compromiso_PS.add(por_comprobar);
				//Actualiza el importe del mes mas el importe no gastado del periodo en cierre
				this.getJdbcTemplate().update("UPDATE SAM_COMP_REQUISIC SET IMPORTE= ? WHERE CVE_REQ =? AND PERIODO = ? AND TIPO =?", new Object[]{actComprimiso_PS, cve_req, mes, "COMPROMISO"});
			}else {
				//Inserta la diferencia en el siguiente mes
				this.getJdbcTemplate().update("INSERT INTO SAM_COMP_REQUISIC(CVE_REQ, TIPO, IMPORTE, PERIODO) VALUES(?,?,?,?)", new Object[]{cve_req, "COMPROMISO", por_comprobar, mes});
			}
			//Inserta el total ocupado en el mes actual
			//this.getJdbcTemplate().update("INSERT INTO SAM_COMP_REQUISIC(CVE_REQ, TIPO, IMPORTE, PERIODO) VALUES(?,?,?,?)", new Object[]{cve_req, "COMPROMISO", totalOcupadoMes, mesAct});
			
		}
		termino();
	}
	
	public void migrarContratos(int mes, int mesAct)
	{
		/*mesAct==Periodo a cerrar*/
		/*mes==Nuevo periodo*/
		java.util.Date fecha = new Date();
		int next_periodo =0;
    	List<Map<String, Object>> Contratos = getJdbcTemplate().queryForList("SELECT SUM(IMPORTE) AS COMPROMETIDO_MES, PERIODO, ID_PROYECTO, CLV_PARTID, CVE_CONTRATO FROM SAM_COMP_CONTRATO " + 
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
    		
    		next_periodo = (int) getJdbcTemplate().queryForObject("SELECT MAX(PERIODO) FROM SAM_COMP_CONTRATO WHERE CVE_CONTRATO = ? AND ID_PROYECTO =? AND CLV_PARTID=? ", new Object[]{c.get("CVE_CONTRATO"), c.get("ID_PROYECTO"), c.get("CLV_PARTID")},Integer.class);
    		
    		//Se actualiza el importe del periodo del contrato por el importe del devengado del periodo que se esta cerrando
    		getJdbcTemplate().update("UPDATE SAM_COMP_CONTRATO SET IMPORTE = ? WHERE CVE_CONTRATO = ? AND PERIODO = ? AND ID_PROYECTO =? AND CLV_PARTID =?", new Object[]{importeTotalMes, c.get("CVE_CONTRATO"), mesAct, c.get("ID_PROYECTO"), c.get("CLV_PARTID")});
    		
    		if (mesAct+1 <= next_periodo){
    			
    			//Obtenemoso el Comprometido del periodo siguiente
        		BigDecimal importeMesSiguiente = (BigDecimal) getJdbcTemplate().queryForObject("SELECT SUM(IMPORTE)COMPROMETIDO_MES_SIGUIENTE FROM SAM_COMP_CONTRATO WHERE CVE_CONTRATO=? AND PERIODO=?  AND ID_PROYECTO =? AND CLV_PARTID=?", new Object[]{ c.get("CVE_CONTRATO"),mesAct+1, c.get("ID_PROYECTO"), c.get("CLV_PARTID")}, BigDecimal.class);
        		
        		//Suma el compromiso del perido siguiente mas la diferencia entre el comprometido y el devengado del periodo que se esta cerrando...
        		BigDecimal Compromiso_modifi = importeMesSiguiente.add(diferencia);
        		getJdbcTemplate().update("UPDATE SAM_COMP_CONTRATO SET IMPORTE = ? WHERE CVE_CONTRATO = ? AND PERIODO = ? AND ID_PROYECTO =? AND CLV_PARTID =?", new Object[]{Compromiso_modifi, c.get("CVE_CONTRATO"), mesAct+1, c.get("ID_PROYECTO"), c.get("CLV_PARTID")});
        		
    		}else{
    			
    			//Se inserta un nuevo registro de compromiso con la diferencia al siguiente mes
        		getJdbcTemplate().update("INSERT INTO SAM_COMP_CONTRATO(CVE_CONTRATO, TIPO_MOV, ID_PROYECTO, CLV_PARTID, PERIODO, IMPORTE) VALUES (?,?,?,?,?,?)", new Object[]{c.get("CVE_CONTRATO"), "COMPROMISO", c.get("ID_PROYECTO"), c.get("CLV_PARTID"), (mesAct+1), diferencia});
        		
    		}
    		    		
    		//FINIQUITAMOS LOS CONTRATOS QUE ESTAN TOTALMENTE DEVENGADOS...
    		BigDecimal devengado = (BigDecimal) getJdbcTemplate().queryForObject("SELECT [dbo].[getDevengadoXDocto] (44,?,?,?)",new Object[]{c.get("CVE_CONTRATO"), c.get("ID_PROYECTO"), c.get("CLV_PARTID")}, BigDecimal.class);
    		BigDecimal comprometido = (BigDecimal) getJdbcTemplate().queryForObject("select SUM(CC.IMPORTE) from SAM_COMP_MOV CC where DOCUMENTO=? AND ID_PROYECTO=? AND CLV_PARTID=?",new Object[]{c.get("CVE_CONTRATO"), c.get("ID_PROYECTO"), c.get("CLV_PARTID")}, BigDecimal.class);
    		
    		int cerrado = (int) getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM SAM_CONTRATOS C WHERE C.FECHA_CERRADO IS NOT NULL AND C.FECHA_CANCELADO IS NULL AND CVE_CONTRATO=?",new Object[]{c.get("CVE_CONTRATO"),}, Integer.class);
    		
    		if(cerrado>0){
    			//Resta el compromiso menos el devengado para finiquitar si es 0
        		BigDecimal por_devengar = comprometido.subtract(devengado);
        		
    			//Combara la variable BigDecimal sea 0=0
    			if (por_devengar.compareTo(BigDecimal.ZERO)==0)
        			//Si el compromiso es igual al devengado finiquita el contrato	    				
        			getJdbcTemplate().update("UPDATE SAM_CONTRATOS SET FECHA_FINIQUITADO=?, MES_FINALIZADO=?, DIA_FINALIZADO=? WHERE CVE_CONTRATO= ?",new Object[]{fecha, c.get("CVE_CONTRATO"), fecha.getMonth()+1,fecha.getDay()});
        		
        		else
        			//Si el compromiso es mayor al devengado  
        			getJdbcTemplate().update("UPDATE SAM_CONTRATOS SET FECHA_FINIQUITADO=?, MES_FINALIZADO=?, DIA_FINALIZADO=? WHERE CVE_CONTRATO= ?",new Object[]{null, c.get("CVE_CONTRATO"),null,null});
    		}
    	}
    }
	
	public void migrarDevengado(int mes, int mesAct)
	{
		if(mes<=12)
		{
    		List<Map<String, Object>> facturas = getJdbcTemplate().queryForList("SELECT CVE_FACTURA FROM SAM_FACTURAS WHERE CVE_FACTURA IN (SELECT CVE_DOC FROM VT_COMPROMISOS WHERE TIPO_DOC ='FAC' AND PERIODO = ?)", new Object[]{mesAct});
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
